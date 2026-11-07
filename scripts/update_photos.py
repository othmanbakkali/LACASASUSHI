"""
Script de mise à jour des photos du menu Casa Sushi
Associe des photos gastronomiques japonaises haute définition spécifiques à chaque plat
"""

import sqlite3

# Catalogue de photos haute définition spécifiques par type de plat
PHOTO_CATALOG = {
    # Makis & California
    'maki_saumon': 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
    'maki_thon': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    'maki_avocat': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    'maki_concombre': 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
    'california_roll': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
    'crunchy_roll': 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    'tobiko_roll': 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?auto=format&fit=crop&w=600&q=80',
    'temaki': 'https://images.unsplash.com/photo-1562436260-8c9216eeb703?auto=format&fit=crop&w=600&q=80',

    # Casa Rolls & Spéciaux
    'casa_roll_supreme': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
    'casa_roll_norvegien': 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
    'casa_roll_rainbow': 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
    'casa_roll_dragon': 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    'casa_roll_cheese': 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=600&q=80',
    'casa_roll_flame': 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?auto=format&fit=crop&w=600&q=80',

    # Nigiri, Gunkan & Tataki
    'nigiri_saumon': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    'nigiri_thon': 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=600&q=80',
    'nigiri_ebi': 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
    'sashimi_mix': 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
    'tataki_saumon': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    'gunkan_tobiko': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    'tartare_saumon': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',

    # Sushi Frits & Pizzas
    'sushi_frit_dragon': 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    'sushi_frit_cheese': 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=600&q=80',
    'pizza_sushi': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    'tempura_crevettes': 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',

    # Plats Chauds & Woks
    'teppanyaki_poulet': 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80',
    'teppanyaki_boeuf': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    'teppanyaki_saumon': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    'pad_thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
    'wok_nouilles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    'sate_poulet': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',

    # Yakitori & Riz
    'yakitori_brochettes': 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
    'yakitori_fromage': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    'riz_cantonais': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',

    # Bentos
    'bento_box_a': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    'bento_box_b': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    'bento_box_c': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',

    # Assortiments & Plateaux
    'plateau_prestige_1': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    'plateau_prestige_2': 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
    'plateau_prestige_3': 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
    'plateau_royal_90': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',

    # Entrées, Salades, Soupes
    'nems_dorés': 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80',
    'rouleaux_printemps': 'https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=600&q=80',
    'salade_wakame': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    'salade_tori': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    'soupe_miso': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    'soupe_udon': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    'dim_sum_vapeur': 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',

    # Desserts & Boissons
    'maki_nutella': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    'fondant_chocolat': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    'banoffee': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
    'the_jasmin': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    'jus_citron': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
}


def get_smart_image_for_product(name, category, subcategory):
    name_l = name.lower()
    cat_l = category.lower()
    sub_l = subcategory.lower() if subcategory else ''

    # 1. Desserts
    if 'nutella' in name_l: return PHOTO_CATALOG['maki_nutella']
    if 'fondant' in name_l or 'chocolat' in name_l: return PHOTO_CATALOG['fondant_chocolat']
    if 'banoffee' in name_l or 'tarte' in name_l: return PHOTO_CATALOG['banoffee']
    if 'thé' in name_l or 'the' in name_l: return PHOTO_CATALOG['the_jasmin']
    if 'jus' in name_l or 'citron' in name_l: return PHOTO_CATALOG['jus_citron']

    # 2. Assortiments & Plateaux
    if cat_l == 'assortiments':
        if '90' in name_l: return PHOTO_CATALOG['plateau_royal_90']
        if '72' in name_l or 'géant' in name_l: return PHOTO_CATALOG['plateau_prestige_1']
        if '48' in name_l or '46' in name_l: return PHOTO_CATALOG['plateau_prestige_2']
        if '30' in name_l or '32' in name_l: return PHOTO_CATALOG['plateau_prestige_3']
        if 'frit' in name_l: return PHOTO_CATALOG['sushi_frit_dragon']
        return PHOTO_CATALOG['plateau_prestige_1']

    # 3. Bentos
    if cat_l == 'bentos':
        if 'a' in name_l: return PHOTO_CATALOG['bento_box_a']
        if 'b' in name_l: return PHOTO_CATALOG['bento_box_b']
        return PHOTO_CATALOG['bento_box_c']

    # 4. Plats Chauds, Woks & Nouilles
    if 'teppanyaki' in name_l or 'teppan' in sub_l:
        if 'poulet' in name_l: return PHOTO_CATALOG['teppanyaki_poulet']
        if 'bœuf' in name_l or 'boeuf' in name_l: return PHOTO_CATALOG['teppanyaki_boeuf']
        if 'saumon' in name_l: return PHOTO_CATALOG['teppanyaki_saumon']
        return PHOTO_CATALOG['teppanyaki_poulet']
    if 'pad thaï' in name_l or 'pad thai' in name_l: return PHOTO_CATALOG['pad_thai']
    if 'saté' in name_l or 'sate' in name_l: return PHOTO_CATALOG['sate_poulet']
    if 'wok' in name_l or 'wok' in sub_l: return PHOTO_CATALOG['wok_nouilles']
    if 'yakitori' in name_l or 'brochette' in sub_l:
        if 'fromage' in name_l: return PHOTO_CATALOG['yakitori_fromage']
        return PHOTO_CATALOG['yakitori_brochettes']
    if 'riz cantonais' in name_l or 'riz' in sub_l: return PHOTO_CATALOG['riz_cantonais']

    # 5. Sushi Frits & Pizzas
    if 'pizza' in name_l: return PHOTO_CATALOG['pizza_sushi']
    if 'dragon' in name_l or 'frit' in name_l or 'pané' in name_l:
        if 'cheese' in name_l or 'fromage' in name_l: return PHOTO_CATALOG['sushi_frit_cheese']
        return PHOTO_CATALOG['sushi_frit_dragon']

    # 6. Nigiri, Gunkan & Tataki
    if 'tataki' in name_l: return PHOTO_CATALOG['tataki_saumon']
    if 'sashimi' in name_l: return PHOTO_CATALOG['sashimi_mix']
    if 'tartare' in name_l or 'chirachi' in name_l: return PHOTO_CATALOG['tartare_saumon']
    if 'gun kan' in name_l or 'gunkan' in name_l: return PHOTO_CATALOG['gunkan_tobiko']
    if 'sushi' in name_l or 'nigiri' in sub_l:
        if 'saumon' in name_l: return PHOTO_CATALOG['nigiri_saumon']
        if 'thon' in name_l: return PHOTO_CATALOG['nigiri_thon']
        if 'ebi' in name_l or 'crevette' in name_l: return PHOTO_CATALOG['nigiri_ebi']
        return PHOTO_CATALOG['nigiri_saumon']

    # 7. Entrées, Salades, Soupes
    if 'nem' in name_l: return PHOTO_CATALOG['nems_dorés']
    if 'rouleau' in name_l or 'printemps' in name_l: return PHOTO_CATALOG['rouleaux_printemps']
    if 'vapeur' in name_l or 'dim sum' in sub_l: return PHOTO_CATALOG['dim_sum_vapeur']
    if 'croquette' in name_l or 'chicken fry' in name_l: return PHOTO_CATALOG['tempura_crevettes']
    if 'salade' in name_l:
        if 'wakame' in name_l or 'goma' in name_l: return PHOTO_CATALOG['salade_wakame']
        return PHOTO_CATALOG['salade_tori']
    if 'soupe' in name_l:
        if 'miso' in name_l: return PHOTO_CATALOG['soupe_miso']
        if 'udon' in name_l: return PHOTO_CATALOG['soupe_udon']
        return PHOTO_CATALOG['soupe_miso']

    # 8. Casa Rolls & Spéciaux
    if cat_l in ('casa_rolls', 'aromaki_style'):
        if 'norvégien' in name_l or 'norvegien' in name_l or 'saumon' in name_l: return PHOTO_CATALOG['casa_roll_norvegien']
        if 'rainbow' in name_l or 'maguro' in name_l: return PHOTO_CATALOG['casa_roll_rainbow']
        if 'dragon' in name_l or 'anaconda' in name_l: return PHOTO_CATALOG['casa_roll_dragon']
        if 'cheese' in name_l or 'gratiné' in name_l: return PHOTO_CATALOG['casa_roll_cheese']
        if 'shaki' in name_l or 'okinawa' in name_l: return PHOTO_CATALOG['casa_roll_flame']
        return PHOTO_CATALOG['casa_roll_supreme']

    # 9. Makis & California
    if 'temaki' in name_l: return PHOTO_CATALOG['temaki']
    if 'crunchy' in name_l: return PHOTO_CATALOG['crunchy_roll']
    if 'tobiko' in name_l or 'masago' in name_l: return PHOTO_CATALOG['tobiko_roll']
    if 'concombre' in name_l: return PHOTO_CATALOG['maki_concombre']
    if 'avocat' in name_l: return PHOTO_CATALOG['maki_avocat']
    if 'thon' in name_l: return PHOTO_CATALOG['maki_thon']
    if 'saumon' in name_l: return PHOTO_CATALOG['maki_saumon']

    return PHOTO_CATALOG['california_roll']


def update_database_photos():
    conn = sqlite3.connect('casa_sushi.db')
    cursor = conn.cursor()
    
    rows = cursor.execute("SELECT id, name, category, subcategory FROM products").fetchall()
    updated_count = 0

    for product_id, name, category, subcategory in rows:
        img_url = get_smart_image_for_product(name, category, subcategory)
        cursor.execute("UPDATE products SET image = ? WHERE id = ?", (img_url, product_id))
        updated_count += 1

    conn.commit()
    conn.close()
    print(f"[*] {updated_count} photos de plats ont été mises à jour avec succès dans la base SQLite !")


if __name__ == '__main__':
    update_database_photos()
