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

    pad = 10
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

def main():
    logo_path = os.path.join(ROOT_DIR, "public", "assets", "logo_icon.png")
    photo_path = os.path.join(ROOT_DIR, "public", "assets", "products", "aceite_lorenzo_mesa.jpg")
    output_path = os.path.join(ROOT_DIR, "public", "assets", "products", "flyer_oliva_noviembre.jpg")
    artifact_path = r"C:\Users\Rami\.gemini\antigravity\brain\6aae8b24-5824-4a75-9321-ac52a81a3a00\flyer_oliva_noviembre.jpg"

    # Canvas dimensions: 1080 x 1350 (4:5 Instagram & WhatsApp portrait)
    W, H = 1080, 1350
    canvas = Image.new("RGBA", (W, H), (250, 248, 243, 255))

    # Warm natural paper background with subtle tonal warmth
    for y in range(H):
        t = y / H
        r = int(252 - t * 8)
        g = int(250 - t * 9)
        b = int(244 - t * 12)
        draw = ImageDraw.Draw(canvas)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    draw = ImageDraw.Draw(canvas)

    # ----------------------------------------------------
    # CARGA DE TIPOGRAFÍAS CON PESOS FUERTES Y VISIBLES (BOLD 700 a BLACK 900)
    # ----------------------------------------------------
    font_header_title = get_font(30, weight=850)
    font_header_sub   = get_font(15, weight=750)
    
    font_eyebrow      = get_font(17, weight=800)
    font_hero_l1      = get_font(62, weight=900)
    font_hero_l2      = get_font(80, weight=900)
    font_hero_sub     = get_font(20, weight=750)
    
    font_tier_vol     = get_font(17, weight=800)
    font_tier_name    = get_font(15, weight=700)
    font_tier_price   = get_font(44, weight=900)
    font_tier_unit    = get_font(15, weight=750)
    font_badge        = get_font(13, weight=850)
    
    font_date_eyebrow = get_font(16, weight=850)
    font_date_main    = get_font(24, weight=900)
    font_date_col_h   = get_font(16, weight=850)
    font_date_detail  = get_font(15, weight=750)
    
    font_cta          = get_font(23, weight=850)
    font_foot_sub     = get_font(14, weight=700)

    # ----------------------------------------------------
    # 1. HEADER HORIZONTAL COMPACTO (Ahorro vertical)
    # ----------------------------------------------------
    header_y = 38
    logo_img = Image.open(logo_path).convert("RGBA")
    logo_h = 58
    logo_w = int(logo_img.width * (logo_h / logo_img.height))
    logo_resized = logo_img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    
    title_text = "ELEMENTALES COMUNIDAD"
    sub_text = "COMPRAS COLECTIVAS  ·  RED BARRIAL DE PRODUCTORES"
    t_bbox = font_header_title.getbbox(title_text)
    title_w = t_bbox[2] - t_bbox[0]
    total_header_w = logo_w + 18 + title_w
    header_start_x = (W - total_header_w) // 2

    # Logo
    canvas.alpha_composite(logo_resized, (header_start_x, header_y))

    # Header text
    text_x = header_start_x + logo_w + 18
    # Title in deep rich olive-black
    draw.text((text_x, header_y + 1), title_text, font=font_header_title, fill=(20, 34, 14, 255))
    draw.text((text_x, header_y + 36), sub_text, font=font_header_sub, fill=(96, 114, 78, 255))

    # Separator hairline
    draw.line([(60, 112), (W - 60, 112)], fill=(218, 210, 196, 255), width=2)

    # ----------------------------------------------------
    # 2. HERO TITULAR: PESO BLACK + DEGRADÉ DE IMPRENTA
    # ----------------------------------------------------
    eyebrow_text = "LOTE LIMITADO  ·  COSECHA FRESCA MENDOZA"
    eb_bbox = font_eyebrow.getbbox(eyebrow_text)
    eb_w = eb_bbox[2] - eb_bbox[0]
    draw.text(((W - eb_w) // 2, 128), eyebrow_text, font=font_eyebrow, fill=(148, 108, 38, 255))

    # "ACEITE DE OLIVA" (Black 900)
    title_l1 = "ACEITE DE OLIVA"
    l1_bbox = font_hero_l1.getbbox(title_l1)
    l1_w = l1_bbox[2] - l1_bbox[0]
    # Rich deep olive with subtle gradient
    grad_l1, ox1, oy1 = create_gradient_text(title_l1, font_hero_l1, (16, 28, 10), (38, 58, 22), horizontal=True)
    canvas.alpha_composite(grad_l1, ((W - l1_w) // 2 - ox1, 150 - oy1))

    # "EXTRA VIRGEN" (Black 900 con degradé de imprenta oliva profundo a oro cálido contrastado)
    title_l2 = "EXTRA VIRGEN"
    l2_bbox = font_hero_l2.getbbox(title_l2)
    l2_w = l2_bbox[2] - l2_bbox[0]
    grad_l2, ox2, oy2 = create_gradient_text(title_l2, font_hero_l2, (18, 32, 12), (180, 138, 38), horizontal=True)
    canvas.alpha_composite(grad_l2, ((W - l2_w) // 2 - ox2, 216 - oy2))

    # Sub-titular producto
    sub_product = "LORENZO CABRERA  ·  PRIMERA PRENSADA EN FRÍO  ·  MAIPÚ, MZA"
    sp_bbox = font_hero_sub.getbbox(sub_product)
    sp_w = sp_bbox[2] - sp_bbox[0]
    draw.text(((W - sp_w) // 2, 304), sub_product, font=font_hero_sub, fill=(68, 84, 52, 255))

    # ----------------------------------------------------
    # 3. IMAGEN HERO CON GRAN FUERZA
    # ----------------------------------------------------
    img_y = 338
    img_w, img_h = 960, 430
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

    corner_r = 20
    mask_rounded = create_rounded_rect_mask((img_w, img_h), corner_r)
    photo_cropped.putalpha(mask_rounded)

    # Ambient soft shadow
    shadow_pad = 12
    shadow = Image.new("RGBA", (img_w + shadow_pad * 2, img_h + shadow_pad * 2), (0, 0, 0, 0))
    draw_sh = ImageDraw.Draw(shadow)
    draw_sh.rounded_rectangle([shadow_pad - 2, shadow_pad + 2, shadow_pad + img_w + 2, shadow_pad + img_h + 6], 
                              radius=corner_r + 2, fill=(0, 0, 0, 50))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    canvas.alpha_composite(shadow, (img_x - shadow_pad, img_y - shadow_pad + 4))

    canvas.alpha_composite(photo_cropped, (img_x, img_y))
    draw.rounded_rectangle([img_x, img_y, img_x + img_w, img_y + img_h], radius=corner_r, outline=(210, 200, 184, 255), width=2)

    # Quality Badge over photo
    badge_tag = "100% PURO & AGROECOLÓGICO"
    bt_bbox = font_badge.getbbox(badge_tag)
    bt_w = bt_bbox[2] - bt_bbox[0]
    tag_bg_w = bt_w + 24
    tag_bg_h = 30
    tag_x = img_x + img_w - tag_bg_w - 18
    tag_y = img_y + 18
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tag_bg_w, tag_y + tag_bg_h], radius=7, fill=(20, 32, 12, 230))
    draw.text((tag_x + 12, tag_y + 6), badge_tag, font=font_badge, fill=(255, 250, 240, 255))

    # ----------------------------------------------------
    # 4. VALORES POR LITRO (3 TARJETAS ULTRA-LEGIBLES)
    # ----------------------------------------------------
    tiers_y = 790
    card_w = 302
    card_h = 168
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
            # Featured card: Warm organic olive tint with strong border
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=16, 
                                   fill=(236, 244, 226, 255), outline=(130, 164, 96, 255), width=3)
            
            # Badge "MÁS ELEGIDO"
            b_text = tier["badge"]
            bb = font_badge.getbbox(b_text)
            bw = bb[2] - bb[0]
            bx = cx + (card_w - bw - 24) // 2
            draw.rounded_rectangle([bx, cy - 13, bx + bw + 24, cy + 13], radius=7, fill=(34, 58, 18, 255))
            draw.text((bx + 12, cy - 7), b_text, font=font_badge, fill=(255, 255, 255, 255))

            # Tier Volume (Bold 800)
            v_bb = font_tier_vol.getbbox(tier["vol"])
            vw = v_bb[2] - v_bb[0]
            draw.text((cx + (card_w - vw) // 2, cy + 22), tier["vol"], font=font_tier_vol, fill=(24, 46, 14, 255))

            # Tier Name (Bold 700)
            n_bb = font_tier_name.getbbox(tier["name"])
            nw = n_bb[2] - n_bb[0]
            draw.text((cx + (card_w - nw) // 2, cy + 45), tier["name"], font=font_tier_name, fill=(65, 92, 45, 255))

            # Price (Black 900 con degradé oliva intenso)
            p_bb = font_tier_price.getbbox(tier["price"])
            pw = p_bb[2] - p_bb[0]
            grad_p, opx, opy = create_gradient_text(tier["price"], font_tier_price, (20, 42, 12), (72, 102, 36), horizontal=True)
            canvas.alpha_composite(grad_p, (cx + (card_w - pw) // 2 - opx, cy + 74 - opy))

            # Unit (Bold 750)
            u_bb = font_tier_unit.getbbox(tier["unit"])
            uw = u_bb[2] - u_bb[0]
            draw.text((cx + (card_w - uw) // 2, cy + 132), tier["unit"], font=font_tier_unit, fill=(38, 64, 22, 255))

        else:
            # Regular cards: White card with distinct crisp border
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=16, 
                                   fill=(255, 255, 255, 255), outline=(218, 210, 196, 255), width=2)

            v_bb = font_tier_vol.getbbox(tier["vol"])
            vw = v_bb[2] - v_bb[0]
            draw.text((cx + (card_w - vw) // 2, cy + 22), tier["vol"], font=font_tier_vol, fill=(62, 74, 52, 255))

            n_bb = font_tier_name.getbbox(tier["name"])
            nw = n_bb[2] - n_bb[0]
            draw.text((cx + (card_w - nw) // 2, cy + 45), tier["name"], font=font_tier_name, fill=(112, 124, 104, 255))

            # Price (Black 900)
            p_bb = font_tier_price.getbbox(tier["price"])
            pw = p_bb[2] - p_bb[0]
            draw.text((cx + (card_w - pw) // 2, cy + 74), tier["price"], font=font_tier_price, fill=(18, 28, 12, 255))

            u_bb = font_tier_unit.getbbox(tier["unit"])
            uw = u_bb[2] - u_bb[0]
            draw.text((cx + (card_w - uw) // 2, cy + 132), tier["unit"], font=font_tier_unit, fill=(94, 106, 86, 255))

    # ----------------------------------------------------
    # 5. BLOQUE DE FECHAS: CIERRE Y ENTREGAS (MÁXIMA LEGIBILIDAD)
    # ----------------------------------------------------
    info_y = 980
    info_h = 176
    draw.rounded_rectangle([img_x, info_y, img_x + img_w, info_y + info_h], radius=18,
                           fill=(245, 241, 232, 255), outline=(214, 204, 188, 255), width=2)

    # Header Cierre de pedidos (tono terracota profundo y fecha en Black 900)
    cierre_eyebrow = "CIERRE DE COMPRA"
    ce_bb = font_date_eyebrow.getbbox(cierre_eyebrow)
    ce_w = ce_bb[2] - ce_bb[0]
    draw.text(((W - ce_w) // 2, info_y + 14), cierre_eyebrow, font=font_date_eyebrow, fill=(162, 60, 26, 255))

    cierre_date = "Domingo 1 de Noviembre  ·  23:59 hs"
    cd_bb = font_date_main.getbbox(cierre_date)
    cd_w = cd_bb[2] - cd_bb[0]
    draw.text(((W - cd_w) // 2, info_y + 36), cierre_date, font=font_date_main, fill=(16, 26, 12, 255))

    # Divider line
    draw.line([(img_x + 30, info_y + 76), (img_x + img_w - 30, info_y + 76)], fill=(218, 208, 192, 255), width=2)

    # Entregas en dos columnas
    col_w = img_w // 2
    
    # Columna Loma Verde
    lv_x = img_x + col_w // 2
    lv_t1 = "ENTREGA NODO LOMA VERDE"
    lv_t2 = "Viernes 6 de Noviembre · 9 a 13 hs"
    lv_t3 = "Botafogo 1320, Loma Verde"

    b1 = font_date_col_h.getbbox(lv_t1)
    draw.text((lv_x - (b1[2]-b1[0])//2, info_y + 88), lv_t1, font=font_date_col_h, fill=(68, 96, 42, 255))
    b2 = font_date_detail.getbbox(lv_t2)
    draw.text((lv_x - (b2[2]-b2[0])//2, info_y + 112), lv_t2, font=font_date_detail, fill=(18, 28, 12, 255))
    b3 = font_date_detail.getbbox(lv_t3)
    draw.text((lv_x - (b3[2]-b3[0])//2, info_y + 135), lv_t3, font=font_date_detail, fill=(90, 102, 82, 255))

    # Divider vertical
    draw.line([(W // 2, info_y + 84), (W // 2, info_y + 162)], fill=(218, 208, 192, 255), width=2)

    # Columna La Lucila
    ll_x = img_x + col_w + col_w // 2
    ll_t1 = "ENTREGA NODO LA LUCILA"
    ll_t2 = "Sábado 7 de Noviembre · 10 a 14 hs"
    ll_t3 = "Anchorena 684, La Lucila"

    b4 = font_date_col_h.getbbox(ll_t1)
    draw.text((ll_x - (b4[2]-b4[0])//2, info_y + 88), ll_t1, font=font_date_col_h, fill=(68, 96, 42, 255))
    b5 = font_date_detail.getbbox(ll_t2)
    draw.text((ll_x - (b5[2]-b5[0])//2, info_y + 112), ll_t2, font=font_date_detail, fill=(18, 28, 12, 255))
    b6 = font_date_detail.getbbox(ll_t3)
    draw.text((ll_x - (b6[2]-b6[0])//2, info_y + 135), ll_t3, font=font_date_detail, fill=(90, 102, 82, 255))

    # ----------------------------------------------------
    # 6. LLAMADO A LA ACCIÓN FINAL (BOTÓN CON DEGRADÉ OLIVA Y ALTO CONTRASTE)
    # ----------------------------------------------------
    btn_w = 660
    btn_h = 74
    btn_x = (W - btn_w) // 2
    btn_y = 1195

    btn_grad = Image.new("RGBA", (btn_w, btn_h))
    r_start, g_start, b_start = (24, 44, 14)
    r_end, g_end, b_end = (64, 94, 38)
    for x in range(btn_w):
        factor = x / btn_w
        r = int(r_start + (r_end - r_start) * factor)
        g = int(g_start + (g_end - g_start) * factor)
        b = int(b_start + (b_end - b_start) * factor)
        for y in range(btn_h):
            btn_grad.putpixel((x, y), (r, g, b, 255))
    
    btn_mask = create_rounded_rect_mask((btn_w, btn_h), 37)
    btn_grad.putalpha(btn_mask)

    # Soft button shadow
    btn_shadow = Image.new("RGBA", (btn_w + 16, btn_h + 16), (0, 0, 0, 0))
    draw_bsh = ImageDraw.Draw(btn_shadow)
    draw_bsh.rounded_rectangle([8, 8, 8 + btn_w, 8 + btn_h], radius=37, fill=(0, 0, 0, 40))
    btn_shadow = btn_shadow.filter(ImageFilter.GaussianBlur(6))
    canvas.alpha_composite(btn_shadow, (btn_x - 8, btn_y - 4))

    canvas.alpha_composite(btn_grad, (btn_x, btn_y))

    cta_text = "Hacé tu pedido en elementales.store/oliva"
    cta_bb = font_cta.getbbox(cta_text)
    cta_w = cta_bb[2] - cta_bb[0]
    draw.text((btn_x + (btn_w - cta_w) // 2, btn_y + 24), cta_text, font=font_cta, fill=(255, 255, 255, 255))

    footer_sub = "Participá de la compra colectiva directa del productor · Sin intermediarios"
    fsub_bb = font_foot_sub.getbbox(footer_sub)
    fsub_w = fsub_bb[2] - fsub_bb[0]
    draw.text(((W - fsub_w) // 2, 1284), footer_sub, font=font_foot_sub, fill=(120, 132, 112, 255))

    # Save high-res JPEG
    final_img = canvas.convert("RGB")
    final_img.save(output_path, "JPEG", quality=95, optimize=True)
    final_img.save(artifact_path, "JPEG", quality=95, optimize=True)
    print(f"Successfully generated BOLD flyer at: {output_path}")

if __name__ == "__main__":
    main()
