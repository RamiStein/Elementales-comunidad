import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT_DIR = r"C:\Users\Rami\Desktop\Repositorio Elementales Comunidad\Elementales-comunidad"
FONT_PATH = os.path.join(ROOT_DIR, "public", "assets", "fonts", "Outfit.ttf")

def get_font(size, weight=700):
    """Loads Outfit with specific variable font weight (100-900)."""
    font = ImageFont.truetype(FONT_PATH, size)
    try:
        font.set_variation_by_axes([weight])
    except Exception as e:
        print(f"Warning setting font axis: {e}")
    return font

def create_gradient_text(text, font, color_start, color_end, horizontal=True):
    """
    Renders text with a smooth color gradient and returns an RGBA image.
    """
    bbox = font.getbbox(text)
    w = max(1, bbox[2] - bbox[0])
    h = max(1, bbox[3] - bbox[1])
    offset_x = bbox[0]
    offset_y = bbox[1]

    pad = 12
    full_w = w + pad * 2
    full_h = h + pad * 2
    mask = Image.new("L", (full_w, full_h), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.text((pad - offset_x, pad - offset_y), text, font=font, fill=255)

    grad = Image.new("RGBA", (full_w, full_h))
    r1, g1, b1 = color_start
    r2, g2, b2 = color_end

    for y in range(full_h):
        for x in range(full_w):
            factor = (x / full_w) if horizontal else (y / full_h)
            r = int(r1 + (r2 - r1) * factor)
            g = int(g1 + (g2 - g1) * factor)
            b = int(b1 + (b2 - b1) * factor)
            grad.putpixel((x, y), (r, g, b, 255))

    grad.putalpha(mask)
    return grad, pad - offset_x, pad - offset_y

def create_rounded_rect_mask(size, radius):
    factor = 4
    fw, fh = size[0] * factor, size[1] * factor
    mask = Image.new("L", (fw, fh), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, fw, fh], radius=radius * factor, fill=255)
    return mask.resize(size, Image.Resampling.LANCZOS)

def build_whatsapp_safe_vertical():
    """
    Genera el flyer vertical de 1080x1350 con Safe Zone calibrada para WhatsApp.
    WhatsApp recorta los ~130px superiores e inferiores en la burbuja del chat.
    Al ubicar todo el contenido entre y=135 e y=1215, NADA se corta en WhatsApp.
    """
    logo_path = os.path.join(ROOT_DIR, "public", "assets", "logo_icon.png")
    photo_path = os.path.join(ROOT_DIR, "public", "assets", "products", "aceite_lorenzo_mesa.jpg")
    
    output_path = os.path.join(ROOT_DIR, "public", "assets", "products", "flyer_oliva_noviembre.jpg")
    output_path_v2 = os.path.join(ROOT_DIR, "public", "assets", "products", "flyer_oliva_noviembre_actualizado.jpg")
    output_path_v3 = os.path.join(ROOT_DIR, "public", "assets", "products", "flyer_oliva_noviembre_v3.jpg")
    output_path_safe = os.path.join(ROOT_DIR, "public", "assets", "products", "flyer_oliva_whatsapp_safe.jpg")
    
    artifact_path = r"C:\Users\Rami\.gemini\antigravity\brain\6aae8b24-5824-4a75-9321-ac52a81a3a00\flyer_oliva_noviembre.jpg"
    artifact_path_v2 = r"C:\Users\Rami\.gemini\antigravity\brain\6aae8b24-5824-4a75-9321-ac52a81a3a00\flyer_oliva_noviembre_actualizado.jpg"
    artifact_path_v3 = r"C:\Users\Rami\.gemini\antigravity\brain\6aae8b24-5824-4a75-9321-ac52a81a3a00\flyer_oliva_noviembre_v3.jpg"
    artifact_path_safe = r"C:\Users\Rami\.gemini\antigravity\brain\6aae8b24-5824-4a75-9321-ac52a81a3a00\flyer_oliva_whatsapp_safe.jpg"

    W, H = 1080, 1350
    canvas = Image.new("RGBA", (W, H), (250, 248, 243, 255))

    # Fondo cálido con degradé sutil
    for y in range(H):
        t = y / H
        r = int(252 - t * 8)
        g = int(250 - t * 9)
        b = int(244 - t * 12)
        draw = ImageDraw.Draw(canvas)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    draw = ImageDraw.Draw(canvas)

    # ----------------------------------------------------
    # CARGA DE TIPOGRAFÍAS CON PESOS BLACK Y BOLD
    # ----------------------------------------------------
    font_hero_l1      = get_font(68, weight=900)
    font_hero_l2      = get_font(90, weight=900)
    font_hero_sub     = get_font(19, weight=800)
    font_photo_badge  = get_font(12, weight=850)
    
    font_tier_vol     = get_font(21, weight=850)
    font_tier_name    = get_font(18, weight=750)
    font_tier_price   = get_font(58, weight=900)
    font_tier_unit    = get_font(18, weight=800)
    font_badge_rec    = get_font(14, weight=900)
    
    font_date_eyebrow = get_font(19, weight=850)
    font_date_main    = get_font(32, weight=900)
    font_date_col_h   = get_font(22, weight=900)
    font_date_day     = get_font(23, weight=900)
    font_date_time    = get_font(20, weight=850)
    font_date_loc     = get_font(18, weight=750)
    
    font_web_link     = get_font(22, weight=850)
    font_footer_title = get_font(20, weight=850)
    font_footer_sub   = get_font(12, weight=750)

    # ----------------------------------------------------
    # 1. TITULAR HERO PRINCIPAL (DENTRO DE LA ZONA SEGURA DE WHATSAPP)
    # Comienza en y = 135 (para que el recorte superior de WhatsApp no lo toque)
    # ----------------------------------------------------
    title_l1 = "ACEITE DE OLIVA"
    l1_bbox = font_hero_l1.getbbox(title_l1)
    l1_w = l1_bbox[2] - l1_bbox[0]
    grad_l1, ox1, oy1 = create_gradient_text(title_l1, font_hero_l1, (16, 28, 10), (38, 58, 22), horizontal=True)
    canvas.alpha_composite(grad_l1, ((W - l1_w) // 2 - ox1, 136 - oy1))

    title_l2 = "EXTRA VIRGEN"
    l2_bbox = font_hero_l2.getbbox(title_l2)
    l2_w = l2_bbox[2] - l2_bbox[0]
    grad_l2, ox2, oy2 = create_gradient_text(title_l2, font_hero_l2, (18, 32, 12), (180, 138, 38), horizontal=True)
    canvas.alpha_composite(grad_l2, ((W - l2_w) // 2 - ox2, 204 - oy2))

    sub_product = "LORENZO CABRERA  ·  PRIMERA PRENSADA EN FRÍO  ·  MAIPÚ, MZA"
    sp_bbox = font_hero_sub.getbbox(sub_product)
    sp_w = sp_bbox[2] - sp_bbox[0]
    draw.text(((W - sp_w) // 2, 302), sub_product, font=font_hero_sub, fill=(68, 84, 52, 255))

    # ----------------------------------------------------
    # 2. IMAGEN HERO DE PRODUCTO
    # y = 336 a 526 (alto 190px)
    # ----------------------------------------------------
    img_y = 336
    img_w, img_h = 960, 192
    img_x = (W - img_w) // 2

    photo = Image.open(photo_path).convert("RGBA")
    photo_ratio = photo.width / photo.height
    target_ratio = img_w / img_h
    if photo_ratio > target_ratio:
        new_h = img_h
        new_w = int(img_h * photo_ratio)
    else:
        new_w = img_w
        new_h = int(img_w / photo_ratio)
    photo_scaled = photo.resize((new_w, new_h), Image.Resampling.LANCZOS)
    crop_x = (new_w - img_w) // 2
    crop_y = (new_h - img_h) // 2
    photo_cropped = photo_scaled.crop((crop_x, crop_y, crop_x + img_w, crop_y + img_h))

    corner_r = 16
    mask_rounded = create_rounded_rect_mask((img_w, img_h), corner_r)
    photo_cropped.putalpha(mask_rounded)

    # Ambient soft shadow
    shadow_pad = 8
    shadow = Image.new("RGBA", (img_w + shadow_pad * 2, img_h + shadow_pad * 2), (0, 0, 0, 0))
    draw_sh = ImageDraw.Draw(shadow)
    draw_sh.rounded_rectangle([shadow_pad - 2, shadow_pad + 2, shadow_pad + img_w + 2, shadow_pad + img_h + 4], 
                              radius=corner_r + 2, fill=(0, 0, 0, 40))
    shadow = shadow.filter(ImageFilter.GaussianBlur(6))
    canvas.alpha_composite(shadow, (img_x - shadow_pad, img_y - shadow_pad + 2))

    canvas.alpha_composite(photo_cropped, (img_x, img_y))
    draw.rounded_rectangle([img_x, img_y, img_x + img_w, img_y + img_h], radius=corner_r, outline=(210, 200, 184, 255), width=2)

    # Quality Badge
    badge_tag = "100% PURO & AGROECOLÓGICO"
    bt_bbox = font_photo_badge.getbbox(badge_tag)
    bt_w = bt_bbox[2] - bt_bbox[0]
    tag_bg_w = bt_w + 20
    tag_bg_h = 26
    tag_x = img_x + img_w - tag_bg_w - 14
    tag_y = img_y + 12
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tag_bg_w, tag_y + tag_bg_h], radius=6, fill=(20, 32, 12, 230))
    draw.text((tag_x + 10, tag_y + 4), badge_tag, font=font_photo_badge, fill=(255, 250, 240, 255))

    # ----------------------------------------------------
    # 3. VALORES POR LITRO (3 TARJETAS)
    # y = 544 a 754 (alto 210px)
    # ----------------------------------------------------
    tiers_y = 544
    card_w = 304
    card_h = 210
    gap = (img_w - (card_w * 3)) // 2
    cards_x = [img_x, img_x + card_w + gap, img_x + (card_w + gap) * 2]

    tiers_data = [
        {
            "vol": "1 A 5 LITROS",
            "name": "Compra Pequeña",
            "price": "$19.700",
            "unit": "por litro",
            "featured": False,
            "badge": None
        },
        {
            "vol": "6 A 19 LITROS",
            "name": "Bidón Familiar",
            "price": "$18.700",
            "unit": "por litro",
            "featured": True,
            "badge": "MÁS ELEGIDO"
        },
        {
            "vol": "20 LITROS O +",
            "name": "Compra Comunitaria",
            "price": "$18.100",
            "unit": "por litro",
            "featured": False,
            "badge": None
        }
    ]

    for i, tier in enumerate(tiers_data):
        cx = cards_x[i]
        cy = tiers_y

        if tier["featured"]:
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=18, 
                                   fill=(236, 245, 226, 255), outline=(122, 158, 86, 255), width=3)
            
            b_text = tier["badge"]
            bb = font_badge_rec.getbbox(b_text)
            bw = bb[2] - bb[0]
            bx = cx + (card_w - bw - 26) // 2
            draw.rounded_rectangle([bx, cy - 14, bx + bw + 26, cy + 14], radius=7, fill=(30, 56, 16, 255))
            draw.text((bx + 13, cy - 7), b_text, font=font_badge_rec, fill=(255, 255, 255, 255))

            v_bb = font_tier_vol.getbbox(tier["vol"])
            vw = v_bb[2] - v_bb[0]
            draw.text((cx + (card_w - vw) // 2, cy + 22), tier["vol"], font=font_tier_vol, fill=(22, 44, 12, 255))

            n_bb = font_tier_name.getbbox(tier["name"])
            nw = n_bb[2] - n_bb[0]
            draw.text((cx + (card_w - nw) // 2, cy + 50), tier["name"], font=font_tier_name, fill=(58, 86, 38, 255))

            p_bb = font_tier_price.getbbox(tier["price"])
            pw = p_bb[2] - p_bb[0]
            grad_p, opx, opy = create_gradient_text(tier["price"], font_tier_price, (18, 40, 10), (68, 98, 32), horizontal=True)
            canvas.alpha_composite(grad_p, (cx + (card_w - pw) // 2 - opx, cy + 86 - opy))

            u_bb = font_tier_unit.getbbox(tier["unit"])
            uw = u_bb[2] - u_bb[0]
            draw.text((cx + (card_w - uw) // 2, cy + 162), tier["unit"], font=font_tier_unit, fill=(34, 60, 20, 255))

        else:
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=18, 
                                   fill=(255, 255, 255, 255), outline=(214, 206, 190, 255), width=2)

            v_bb = font_tier_vol.getbbox(tier["vol"])
            vw = v_bb[2] - v_bb[0]
            draw.text((cx + (card_w - vw) // 2, cy + 22), tier["vol"], font=font_tier_vol, fill=(58, 70, 48, 255))

            n_bb = font_tier_name.getbbox(tier["name"])
            nw = n_bb[2] - n_bb[0]
            draw.text((cx + (card_w - nw) // 2, cy + 50), tier["name"], font=font_tier_name, fill=(108, 120, 100, 255))

            p_bb = font_tier_price.getbbox(tier["price"])
            pw = p_bb[2] - p_bb[0]
            draw.text((cx + (card_w - pw) // 2, cy + 86), tier["price"], font=font_tier_price, fill=(16, 26, 10, 255))

            u_bb = font_tier_unit.getbbox(tier["unit"])
            uw = u_bb[2] - u_bb[0]
            draw.text((cx + (card_w - uw) // 2, cy + 162), tier["unit"], font=font_tier_unit, fill=(90, 102, 82, 255))

    # ----------------------------------------------------
    # 4. BLOQUE DE FECHAS: CIERRE Y ENTREGAS (MÁXIMA LEGIBILIDAD)
    # y = 770 a 1120 (alto 350px)
    # ----------------------------------------------------
    info_y = 770
    info_h = 352
    draw.rounded_rectangle([img_x, info_y, img_x + img_w, info_y + info_h], radius=22,
                           fill=(245, 241, 232, 255), outline=(210, 200, 184, 255), width=2)

    # Cierre de compra
    cierre_eyebrow = "CIERRE DE COMPRA"
    ce_bb = font_date_eyebrow.getbbox(cierre_eyebrow)
    ce_w = ce_bb[2] - ce_bb[0]
    draw.text(((W - ce_w) // 2, info_y + 18), cierre_eyebrow, font=font_date_eyebrow, fill=(168, 54, 18, 255))

    cierre_date = "Domingo 1 de Noviembre  ·  23:59 hs"
    cd_bb = font_date_main.getbbox(cierre_date)
    cd_w = cd_bb[2] - cd_bb[0]
    draw.text(((W - cd_w) // 2, info_y + 48), cierre_date, font=font_date_main, fill=(16, 26, 12, 255))

    # Hairline divider
    draw.line([(img_x + 36, info_y + 104), (img_x + img_w - 36, info_y + 104)], fill=(214, 204, 188, 255), width=2)

    # Entregas en dos columnas
    col_w = img_w // 2
    
    # Columna Loma Verde
    lv_cx = img_x + col_w // 2
    lv_t1 = "ENTREGA NODO LOMA VERDE"
    lv_t2 = "Viernes 6 de Noviembre"
    lv_t3 = "Horario: 9 a 13 hs"
    lv_t4 = "Botafogo 1320, Loma Verde"

    b1 = font_date_col_h.getbbox(lv_t1)
    draw.text((lv_cx - (b1[2]-b1[0])//2, info_y + 126), lv_t1, font=font_date_col_h, fill=(46, 78, 24, 255))
    
    b2 = font_date_day.getbbox(lv_t2)
    draw.text((lv_cx - (b2[2]-b2[0])//2, info_y + 168), lv_t2, font=font_date_day, fill=(16, 26, 12, 255))
    
    b3 = font_date_time.getbbox(lv_t3)
    draw.text((lv_cx - (b3[2]-b3[0])//2, info_y + 208), lv_t3, font=font_date_time, fill=(30, 52, 18, 255))
    
    b4 = font_date_loc.getbbox(lv_t4)
    draw.text((lv_cx - (b4[2]-b4[0])//2, info_y + 252), lv_t4, font=font_date_loc, fill=(80, 94, 72, 255))

    # Divider central vertical
    draw.line([(W // 2, info_y + 122), (W // 2, info_y + 322)], fill=(214, 204, 188, 255), width=2)

    # Columna La Lucila
    ll_cx = img_x + col_w + col_w // 2
    ll_t1 = "ENTREGA NODO LA LUCILA"
    ll_t2 = "Sábado 7 de Noviembre"
    ll_t3 = "Horario: 10 a 14 hs"
    ll_t4 = "Anchorena 684, La Lucila"

    b5 = font_date_col_h.getbbox(ll_t1)
    draw.text((ll_cx - (b5[2]-b5[0])//2, info_y + 126), ll_t1, font=font_date_col_h, fill=(46, 78, 24, 255))
    
    b6 = font_date_day.getbbox(ll_t2)
    draw.text((ll_cx - (b6[2]-b6[0])//2, info_y + 168), ll_t2, font=font_date_day, fill=(16, 26, 12, 255))
    
    b7 = font_date_time.getbbox(ll_t3)
    draw.text((ll_cx - (b7[2]-b7[0])//2, info_y + 208), ll_t3, font=font_date_time, fill=(30, 52, 18, 255))
    
    b8 = font_date_loc.getbbox(ll_t4)
    draw.text((ll_cx - (b8[2]-b8[0])//2, info_y + 252), ll_t4, font=font_date_loc, fill=(80, 94, 72, 255))

    # ----------------------------------------------------
    # 5. FOOTER CON ISOLOGO Y ENLACE (DENTRO DE LA ZONA SEGURA DE WHATSAPP)
    # y = 1136 a 1215
    # ----------------------------------------------------
    web_text = "Hacé tu pedido online en  elementales.store/oliva"
    wb = font_web_link.getbbox(web_text)
    wb_w = wb[2] - wb[0]
    draw.text(((W - wb_w) // 2, 1136), web_text, font=font_web_link, fill=(24, 46, 14, 255))

    draw.line([(220, 1172), (W - 220, 1172)], fill=(222, 214, 202, 255), width=1)

    footer_logo_h = 38
    logo_img = Image.open(logo_path).convert("RGBA")
    footer_logo_w = int(logo_img.width * (footer_logo_h / logo_img.height))
    footer_logo_resized = logo_img.resize((footer_logo_w, footer_logo_h), Image.Resampling.LANCZOS)

    foot_title_text = "ELEMENTALES COMUNIDAD"
    foot_sub_text = "COMPRAS COLECTIVAS  ·  RED BARRIAL DE PRODUCTORES"
    ft_bbox = font_footer_title.getbbox(foot_title_text)
    ft_w = ft_bbox[2] - ft_bbox[0]
    
    total_foot_w = footer_logo_w + 12 + ft_w
    foot_start_x = (W - total_foot_w) // 2
    foot_y = 1184

    canvas.alpha_composite(footer_logo_resized, (foot_start_x, foot_y))

    foot_text_x = foot_start_x + footer_logo_w + 12
    draw.text((foot_text_x, foot_y - 1), foot_title_text, font=font_footer_title, fill=(28, 46, 18, 255))
    draw.text((foot_text_x, foot_y + 22), foot_sub_text, font=font_footer_sub, fill=(102, 120, 84, 255))

    # Guardar versión vertical con Safe Area de WhatsApp
    final_img = canvas.convert("RGB")
    final_img.save(output_path, "JPEG", quality=95, optimize=True)
    final_img.save(output_path_v2, "JPEG", quality=95, optimize=True)
    final_img.save(output_path_v3, "JPEG", quality=95, optimize=True)
    final_img.save(output_path_safe, "JPEG", quality=95, optimize=True)
    
    final_img.save(artifact_path, "JPEG", quality=95, optimize=True)
    final_img.save(artifact_path_v2, "JPEG", quality=95, optimize=True)
    final_img.save(artifact_path_v3, "JPEG", quality=95, optimize=True)
    final_img.save(artifact_path_safe, "JPEG", quality=95, optimize=True)
    print("Vertical WhatsApp-Safe flyer generated successfully!")

def build_whatsapp_square():
    """
    Genera además una versión CUADRADA 1:1 (1080x1080) perfecta para WhatsApp.
    WhatsApp JAMÁS recorta imágenes 1:1 en la burbuja del chat.
    """
    logo_path = os.path.join(ROOT_DIR, "public", "assets", "logo_icon.png")
    photo_path = os.path.join(ROOT_DIR, "public", "assets", "products", "aceite_lorenzo_mesa.jpg")
    output_path_sq = os.path.join(ROOT_DIR, "public", "assets", "products", "flyer_oliva_whatsapp_cuadrado.jpg")
    artifact_path_sq = r"C:\Users\Rami\.gemini\antigravity\brain\6aae8b24-5824-4a75-9321-ac52a81a3a00\flyer_oliva_whatsapp_cuadrado.jpg"

    W, H = 1080, 1080
    canvas = Image.new("RGBA", (W, H), (250, 248, 243, 255))

    for y in range(H):
        t = y / H
        r = int(252 - t * 8)
        g = int(250 - t * 9)
        b = int(244 - t * 12)
        draw = ImageDraw.Draw(canvas)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    draw = ImageDraw.Draw(canvas)

    font_hero_l1 = get_font(58, weight=900)
    font_hero_l2 = get_font(76, weight=900)
    font_hero_sub = get_font(17, weight=800)
    font_photo_badge = get_font(11, weight=850)
    
    font_tier_vol = get_font(19, weight=850)
    font_tier_name = get_font(16, weight=750)
    font_tier_price = get_font(50, weight=900)
    font_tier_unit = get_font(16, weight=800)
    font_badge_rec = get_font(13, weight=900)
    
    font_date_eyebrow = get_font(17, weight=850)
    font_date_main = get_font(27, weight=900)
    font_date_col_h = get_font(19, weight=900)
    font_date_day = get_font(20, weight=900)
    font_date_time = get_font(18, weight=850)
    font_date_loc = get_font(16, weight=750)
    
    font_web_link = get_font(21, weight=850)
    font_footer_title = get_font(18, weight=850)
    font_footer_sub = get_font(11, weight=750)

    # 1. Titular
    title_l1 = "ACEITE DE OLIVA"
    l1_bbox = font_hero_l1.getbbox(title_l1)
    grad_l1, ox1, oy1 = create_gradient_text(title_l1, font_hero_l1, (16, 28, 10), (38, 58, 22), horizontal=True)
    canvas.alpha_composite(grad_l1, ((W - (l1_bbox[2]-l1_bbox[0])) // 2 - ox1, 38 - oy1))

    title_l2 = "EXTRA VIRGEN"
    l2_bbox = font_hero_l2.getbbox(title_l2)
    grad_l2, ox2, oy2 = create_gradient_text(title_l2, font_hero_l2, (18, 32, 12), (180, 138, 38), horizontal=True)
    canvas.alpha_composite(grad_l2, ((W - (l2_bbox[2]-l2_bbox[0])) // 2 - ox2, 98 - oy2))

    sub_p = "LORENZO CABRERA  ·  PRIMERA PRENSADA EN FRÍO  ·  MAIPÚ, MZA"
    sp_bb = font_hero_sub.getbbox(sub_p)
    draw.text(((W - (sp_bb[2]-sp_bb[0])) // 2, 184), sub_p, font=font_hero_sub, fill=(68, 84, 52, 255))

    # 2. Foto compacta (1080x155)
    img_y = 212
    img_w, img_h = 960, 155
    img_x = (W - img_w) // 2

    photo = Image.open(photo_path).convert("RGBA")
    ratio = photo.width / photo.height
    t_ratio = img_w / img_h
    new_h = img_h if ratio > t_ratio else int(img_w / ratio)
    new_w = int(img_h * ratio) if ratio > t_ratio else img_w
    p_sc = photo.resize((new_w, new_h), Image.Resampling.LANCZOS)
    p_cr = p_sc.crop(((new_w - img_w)//2, (new_h - img_h)//2, (new_w - img_w)//2 + img_w, (new_h - img_h)//2 + img_h))
    
    corner_r = 14
    p_cr.putalpha(create_rounded_rect_mask((img_w, img_h), corner_r))
    canvas.alpha_composite(p_cr, (img_x, img_y))
    draw.rounded_rectangle([img_x, img_y, img_x + img_w, img_y + img_h], radius=corner_r, outline=(210, 200, 184, 255), width=2)

    # 3. Precios (y = 380 a 565, alto 185px)
    tiers_y = 382
    card_w = 304
    card_h = 182
    gap = (img_w - (card_w * 3)) // 2
    cards_x = [img_x, img_x + card_w + gap, img_x + (card_w + gap) * 2]

    tiers_data = [
        {"vol": "1 A 5 LITROS", "name": "Compra Pequeña", "price": "$19.700", "unit": "por litro", "featured": False},
        {"vol": "6 A 19 LITROS", "name": "Bidón Familiar", "price": "$18.700", "unit": "por litro", "featured": True, "badge": "MÁS ELEGIDO"},
        {"vol": "20 LITROS O +", "name": "Compra Comunitaria", "price": "$18.100", "unit": "por litro", "featured": False}
    ]

    for i, tier in enumerate(tiers_data):
        cx = cards_x[i]
        cy = tiers_y
        if tier["featured"]:
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=16, fill=(236, 245, 226, 255), outline=(122, 158, 86, 255), width=3)
            bb = font_badge_rec.getbbox(tier["badge"])
            bw = bb[2] - bb[0]
            bx = cx + (card_w - bw - 22) // 2
            draw.rounded_rectangle([bx, cy - 12, bx + bw + 22, cy + 12], radius=6, fill=(30, 56, 16, 255))
            draw.text((bx + 11, cy - 6), tier["badge"], font=font_badge_rec, fill=(255, 255, 255, 255))

            v_bb = font_tier_vol.getbbox(tier["vol"])
            draw.text((cx + (card_w - (v_bb[2]-v_bb[0])) // 2, cy + 18), tier["vol"], font=font_tier_vol, fill=(22, 44, 12, 255))
            n_bb = font_tier_name.getbbox(tier["name"])
            draw.text((cx + (card_w - (n_bb[2]-n_bb[0])) // 2, cy + 42), tier["name"], font=font_tier_name, fill=(58, 86, 38, 255))
            p_bb = font_tier_price.getbbox(tier["price"])
            grad_p, opx, opy = create_gradient_text(tier["price"], font_tier_price, (18, 40, 10), (68, 98, 32), horizontal=True)
            canvas.alpha_composite(grad_p, (cx + (card_w - (p_bb[2]-p_bb[0])) // 2 - opx, cy + 72 - opy))
            u_bb = font_tier_unit.getbbox(tier["unit"])
            draw.text((cx + (card_w - (u_bb[2]-u_bb[0])) // 2, cy + 140), tier["unit"], font=font_tier_unit, fill=(34, 60, 20, 255))
        else:
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=16, fill=(255, 255, 255, 255), outline=(214, 206, 190, 255), width=2)
            v_bb = font_tier_vol.getbbox(tier["vol"])
            draw.text((cx + (card_w - (v_bb[2]-v_bb[0])) // 2, cy + 18), tier["vol"], font=font_tier_vol, fill=(58, 70, 48, 255))
            n_bb = font_tier_name.getbbox(tier["name"])
            draw.text((cx + (card_w - (n_bb[2]-n_bb[0])) // 2, cy + 42), tier["name"], font=font_tier_name, fill=(108, 120, 100, 255))
            p_bb = font_tier_price.getbbox(tier["price"])
            draw.text((cx + (card_w - (p_bb[2]-p_bb[0])) // 2, cy + 72), tier["price"], font=font_tier_price, fill=(16, 26, 10, 255))
            u_bb = font_tier_unit.getbbox(tier["unit"])
            draw.text((cx + (card_w - (u_bb[2]-u_bb[0])) // 2, cy + 140), tier["unit"], font=font_tier_unit, fill=(90, 102, 82, 255))

    # 4. Fechas (y = 580 a 890, alto 310px)
    info_y = 580
    info_h = 310
    draw.rounded_rectangle([img_x, info_y, img_x + img_w, info_y + info_h], radius=20, fill=(245, 241, 232, 255), outline=(210, 200, 184, 255), width=2)

    ce_bb = font_date_eyebrow.getbbox("CIERRE DE COMPRA")
    draw.text(((W - (ce_bb[2]-ce_bb[0])) // 2, info_y + 16), "CIERRE DE COMPRA", font=font_date_eyebrow, fill=(168, 54, 18, 255))
    cd_bb = font_date_main.getbbox("Domingo 1 de Noviembre  ·  23:59 hs")
    draw.text(((W - (cd_bb[2]-cd_bb[0])) // 2, info_y + 42), "Domingo 1 de Noviembre  ·  23:59 hs", font=font_date_main, fill=(16, 26, 12, 255))
    draw.line([(img_x + 30, info_y + 92), (img_x + img_w - 30, info_y + 92)], fill=(214, 204, 188, 255), width=2)

    col_w = img_w // 2
    # Loma verde
    lv_cx = img_x + col_w // 2
    b1 = font_date_col_h.getbbox("ENTREGA NODO LOMA VERDE")
    draw.text((lv_cx - (b1[2]-b1[0])//2, info_y + 110), "ENTREGA NODO LOMA VERDE", font=font_date_col_h, fill=(46, 78, 24, 255))
    b2 = font_date_day.getbbox("Viernes 6 de Noviembre")
    draw.text((lv_cx - (b2[2]-b2[0])//2, info_y + 148), "Viernes 6 de Noviembre", font=font_date_day, fill=(16, 26, 12, 255))
    b3 = font_date_time.getbbox("Horario: 9 a 13 hs")
    draw.text((lv_cx - (b3[2]-b3[0])//2, info_y + 184), "Horario: 9 a 13 hs", font=font_date_time, fill=(30, 52, 18, 255))
    b4 = font_date_loc.getbbox("Botafogo 1320, Loma Verde")
    draw.text((lv_cx - (b4[2]-b4[0])//2, info_y + 224), "Botafogo 1320, Loma Verde", font=font_date_loc, fill=(80, 94, 72, 255))

    draw.line([(W // 2, info_y + 106), (W // 2, info_y + 286)], fill=(214, 204, 188, 255), width=2)

    # La Lucila
    ll_cx = img_x + col_w + col_w // 2
    b5 = font_date_col_h.getbbox("ENTREGA NODO LA LUCILA")
    draw.text((ll_cx - (b5[2]-b5[0])//2, info_y + 110), "ENTREGA NODO LA LUCILA", font=font_date_col_h, fill=(46, 78, 24, 255))
    b6 = font_date_day.getbbox("Sábado 7 de Noviembre")
    draw.text((ll_cx - (b6[2]-b6[0])//2, info_y + 148), "Sábado 7 de Noviembre", font=font_date_day, fill=(16, 26, 12, 255))
    b7 = font_date_time.getbbox("Horario: 10 a 14 hs")
    draw.text((ll_cx - (b7[2]-b7[0])//2, info_y + 184), "Horario: 10 a 14 hs", font=font_date_time, fill=(30, 52, 18, 255))
    b8 = font_date_loc.getbbox("Anchorena 684, La Lucila")
    draw.text((ll_cx - (b8[2]-b8[0])//2, info_y + 224), "Anchorena 684, La Lucila", font=font_date_loc, fill=(80, 94, 72, 255))

    # 5. Footer (y = 910 a 1050)
    wb = font_web_link.getbbox("Hacé tu pedido online en  elementales.store/oliva")
    draw.text(((W - (wb[2]-wb[0])) // 2, 912), "Hacé tu pedido online en  elementales.store/oliva", font=font_web_link, fill=(24, 46, 14, 255))
    draw.line([(220, 952), (W - 220, 952)], fill=(222, 214, 202, 255), width=1)

    logo_h = 36
    l_img = Image.open(logo_path).convert("RGBA")
    logo_w = int(l_img.width * (logo_h / l_img.height))
    l_res = l_img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    
    ft_bb = font_footer_title.getbbox("ELEMENTALES COMUNIDAD")
    tot_w = logo_w + 10 + (ft_bb[2] - ft_bb[0])
    s_x = (W - tot_w) // 2
    f_y = 964
    canvas.alpha_composite(l_res, (s_x, f_y))
    draw.text((s_x + logo_w + 10, f_y - 2), "ELEMENTALES COMUNIDAD", font=font_footer_title, fill=(28, 46, 18, 255))
    draw.text((s_x + logo_w + 10, f_y + 20), "COMPRAS COLECTIVAS  ·  RED BARRIAL DE PRODUCTORES", font=font_footer_sub, fill=(102, 120, 84, 255))

    final_sq = canvas.convert("RGB")
    final_sq.save(output_path_sq, "JPEG", quality=95, optimize=True)
    final_sq.save(artifact_path_sq, "JPEG", quality=95, optimize=True)
    print("Square 1:1 WhatsApp flyer generated successfully!")

if __name__ == "__main__":
    build_whatsapp_safe_vertical()
    build_whatsapp_square()
