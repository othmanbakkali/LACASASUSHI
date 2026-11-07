"""
Contrôleur de Génération PDF Serveur (PdfController)
Génération de catalogues PDF gastronomiques illustrés avec photos intégrées
Haute résolution, mise en page vectorielle A4 & zéro page blanche
"""

import io
import os
import urllib.request
from PIL import Image as PILImage
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image as RLImage
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from src.models.category import CategoryModel
from src.models.product import ProductModel
from src.models.promo_pack import PromoPackModel
from src.config.database import UPLOADS_DIR

# Répertoire de cache pour les miniatures d'images du PDF
CACHE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'scratch', 'pdf_cache')
os.makedirs(CACHE_DIR, exist_ok=True)

# Image de secours en mémoire
_fallback_img_bytes = None


def get_fallback_image():
    global _fallback_img_bytes
    if _fallback_img_bytes is None:
        img = PILImage.new('RGB', (120, 90), color=(30, 35, 48))
        buf = io.BytesIO()
        img.save(buf, format='JPEG', quality=80)
        _fallback_img_bytes = buf.getvalue()
    return io.BytesIO(_fallback_img_bytes)


def load_and_resize_image(image_url, target_width=130, target_height=100):
    """Charge, redimensionne et met en cache une photo de plat pour le PDF."""
    if not image_url:
        return get_fallback_image()

    # 1. Vérification si fichier local uploads
    local_path = None
    if image_url.startswith('/uploads/'):
        clean_name = image_url.replace('/uploads/', '').strip()
        local_path = os.path.join(UPLOADS_DIR, clean_name)
    elif os.path.isabs(image_url) and os.path.exists(image_url):
        local_path = image_url

    if local_path and os.path.exists(local_path):
        try:
            pil_img = PILImage.open(local_path).convert('RGB')
            pil_img.thumbnail((target_width, target_height))
            buf = io.BytesIO()
            pil_img.save(buf, format='JPEG', quality=85)
            buf.seek(0)
            return buf
        except Exception:
            return get_fallback_image()

    # 2. URL distante (Unsplash ou Web) avec cache disque
    import hashlib
    url_hash = hashlib.md5(image_url.encode('utf-8')).hexdigest()
    cached_file = os.path.join(CACHE_DIR, f"{url_hash}.jpg")

    if os.path.exists(cached_file) and os.path.getsize(cached_file) > 500:
        try:
            with open(cached_file, 'rb') as f:
                return io.BytesIO(f.read())
        except Exception:
            pass

    # Téléchargement avec timeout court
    try:
        req = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
        raw_data = urllib.request.urlopen(req, timeout=3.5).read()
        pil_img = PILImage.open(io.BytesIO(raw_data)).convert('RGB')
        pil_img.thumbnail((target_width, target_height))
        
        with open(cached_file, 'wb') as f:
            pil_img.save(f, format='JPEG', quality=85)
        
        buf = io.BytesIO()
        pil_img.save(buf, format='JPEG', quality=85)
        buf.seek(0)
        return buf
    except Exception:
        return get_fallback_image()


def add_page_decorations(canvas, doc):
    canvas.saveState()
    # Barre supérieure dorée
    canvas.setFillColor(colors.HexColor('#d4a373'))
    canvas.rect(0, A4[1] - 6, A4[0], 6, fill=True, stroke=False)

    # Pied de page
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#666666'))
    footer_text = "🍣 Casa Sushi Tanger • Bd Mohammed V • WhatsApp: 06 01 86 09 39 • 100% Halal & Poissons Frais"
    canvas.drawString(28, 16, footer_text)
    
    page_num = canvas.getPageNumber()
    canvas.drawRightString(A4[0] - 28, 16, f"Page {page_num}")
    canvas.restoreState()


class PdfController:
    @staticmethod
    def generate_menu_pdf():
        """Génère le catalogue PDF illustré avec photos pour tous les plats."""
        buffer = io.BytesIO()

        # Document A4 marges optimisées
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            leftMargin=24,
            rightMargin=24,
            topMargin=24,
            bottomMargin=30
        )

        styles = getSampleStyleSheet()
        
        c_crimson = colors.HexColor('#b91c1c')
        c_gold = colors.HexColor('#9a6700')
        c_dark = colors.HexColor('#111827')
        c_gray = colors.HexColor('#4b5563')
        c_light_bg = colors.HexColor('#f8f9fa')

        title_style = ParagraphStyle(
            'CoverTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=24,
            leading=28,
            alignment=TA_CENTER,
            textColor=c_crimson
        )

        subtitle_style = ParagraphStyle(
            'CoverSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10,
            leading=13,
            alignment=TA_CENTER,
            textColor=c_gold
        )

        info_box_style = ParagraphStyle(
            'CoverInfo',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8.5,
            leading=11,
            alignment=TA_CENTER,
            textColor=c_dark
        )

        cat_title_style = ParagraphStyle(
            'CategoryTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=11.5,
            leading=14,
            textColor=colors.white
        )

        dish_name_style = ParagraphStyle(
            'DishName',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=8.5,
            leading=10.5,
            textColor=c_dark
        )

        dish_desc_style = ParagraphStyle(
            'DishDesc',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=7,
            leading=8.5,
            textColor=c_gray
        )

        dish_price_style = ParagraphStyle(
            'DishPrice',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=9.5,
            leading=11,
            alignment=TA_RIGHT,
            textColor=c_crimson
        )

        dish_meta_style = ParagraphStyle(
            'DishMeta',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=7,
            leading=8.5,
            textColor=c_gold
        )

        printable_width = A4[0] - 48  # 547.27 pt
        col_width = (printable_width - 8) / 2  # ~269.6 pt par colonne

        story = []

        # ==========================================
        # 1. COUVERTURE PRESTIGE
        # ==========================================
        story.append(Paragraph("CASA SUSHI TANGER", title_style))
        story.append(Spacer(1, 3))
        story.append(Paragraph("HAUTE GASTRONOMIE JAPONAISE & CRÉATIONS FRAÎCHES", subtitle_style))
        story.append(Spacer(1, 6))

        info_text = "📍 Bd Mohammed V, Tanger &nbsp;&nbsp;|&nbsp;&nbsp; 📱 WhatsApp : 06 01 86 09 39 &nbsp;&nbsp;|&nbsp;&nbsp; ⏱️ Ouvert 7j/7 &nbsp;&nbsp;|&nbsp;&nbsp; ✨ 100% Halal"
        info_table = Table([[Paragraph(info_text, info_box_style)]], colWidths=[printable_width])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), c_light_bg),
            ('BOX', (0, 0), (-1, -1), 1, c_gold),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ]))
        story.append(info_table)
        story.append(Spacer(1, 10))

        # ==========================================
        # 2. PACKS PROMOS ACTIFS AVEC PHOTOS
        # ==========================================
        all_promos = PromoPackModel.get_all()
        promos = [p for p in all_promos if p.get('active', True)]
        if promos:
            promo_header = Table([[Paragraph("🔥 OFFRES SPÉCIALES & PACKS PROMOTIONNELS", cat_title_style)]], colWidths=[printable_width])
            promo_header.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#b45309')),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ]))
            story.append(promo_header)
            story.append(Spacer(1, 4))

            promo_rows = []
            for p in promos:
                img_stream = load_and_resize_image(p.get('image'))
                rl_img = RLImage(img_stream, width=50, height=38)

                name_p = Paragraph(f"<b>{p['title']}</b> <font color='#b45309'>({p.get('badge', 'PROMO')})</font>", dish_name_style)
                desc_p = Paragraph(p.get('description', ''), dish_desc_style)
                old_p = f"<font color='#888888'><strike>{p['oldPrice']} DH</strike></font> " if p.get('oldPrice') else ""
                price_p = Paragraph(f"{old_p}<b>{p['newPrice']} DH</b>", dish_price_style)

                details_table = Table([[name_p], [desc_p]], colWidths=[printable_width - 150])
                details_table.setStyle(TableStyle([('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))

                promo_rows.append([rl_img, details_table, price_p])

            if promo_rows:
                promo_table = Table(promo_rows, colWidths=[56, printable_width - 146, 90])
                promo_table.setStyle(TableStyle([
                    ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e5e7eb')),
                    ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#fffbeb')),
                    ('TOPPADDING', (0, 0), (-1, -1), 3),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ]))
                story.append(promo_table)
                story.append(Spacer(1, 10))

        # ==========================================
        # 3. TOUTES LES CATÉGORIES & PLATS AVEC PHOTOS ILLUSTRÉES
        # ==========================================
        categories = CategoryModel.get_all(include_inactive=False)
        products = ProductModel.get_all()

        photo_w = 48
        photo_h = 38
        details_w = col_width - photo_w - 60
        price_w = 50

        for cat in categories:
            cat_products = [p for p in products if p['category'] == cat['id'] and p.get('inStock', True) is not False]
            if not cat_products:
                continue

            # En-tête de catégorie
            cat_header = Table([[Paragraph(f"📂 {cat['name'].upper()}", cat_title_style)]], colWidths=[printable_width])
            cat_header.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), c_crimson),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ]))
            
            cat_elements = [Spacer(1, 6), cat_header, Spacer(1, 4)]

            grid_data = []
            row = []

            for p in cat_products:
                img_stream = load_and_resize_image(p.get('image'))
                rl_img = RLImage(img_stream, width=photo_w, height=photo_h)

                pieces_text = f" • {p['pieces']}" if p.get('pieces') else ""
                subcat_text = p.get('subcategory', '')
                meta_line = f"{subcat_text}{pieces_text}".strip()

                dish_cell_content = [
                    Paragraph(f"<b>{p['name']}</b>", dish_name_style)
                ]
                if meta_line:
                    dish_cell_content.append(Paragraph(meta_line, dish_meta_style))
                
                desc_text = p.get('description', '')
                if p.get('ingredients'):
                    desc_text += f" ({', '.join(p['ingredients'][:3])})"
                
                if desc_text:
                    dish_cell_content.append(Paragraph(desc_text[:95], dish_desc_style))

                details_subtable = Table([[c] for c in dish_cell_content], colWidths=[details_w])
                details_subtable.setStyle(TableStyle([
                    ('TOPPADDING', (0,0), (-1,-1), 0),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
                    ('LEFTPADDING', (0,0), (-1,-1), 0),
                ]))

                price_p = Paragraph(f"<b>{p['price']} DH</b>", dish_price_style)

                # Carte individuelle avec Photo + Détails + Prix
                card_table = Table([
                    [rl_img, details_subtable, price_p]
                ], colWidths=[photo_w + 4, details_w, price_w])
                
                card_table.setStyle(TableStyle([
                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                    ('TOPPADDING', (0, 0), (-1, -1), 2),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
                    ('LEFTPADDING', (0, 0), (-1, -1), 2),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 2),
                ]))

                row.append(card_table)

                if len(row) == 2:
                    grid_data.append(row)
                    row = []

            if row:
                row.append("")  # cellule vide pour compléter la ligne
                grid_data.append(row)

            if grid_data:
                dishes_table = Table(grid_data, colWidths=[col_width, col_width])
                dishes_table.setStyle(TableStyle([
                    ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e5e7eb')),
                    ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ffffff')),
                    ('TOPPADDING', (0, 0), (-1, -1), 2),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
                    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ]))
                cat_elements.append(dishes_table)

            story.append(KeepTogether(cat_elements))
            story.append(Spacer(1, 8))

        doc.build(story, onFirstPage=add_page_decorations, onLaterPages=add_page_decorations)

        buffer.seek(0)
        return buffer.getvalue()
