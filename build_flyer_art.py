import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_gradient_text(text, font, color_start, color_end, horizontal=True):
    """
    Renders text with a smooth color gradient and returns an RGBA image.
    """
    bbox = font.getbbox(text)
    w = max(1, bbox[2] - bbox[0])
    h = max(1, bbox[3] - bbox[1])
    offset_x = bbox[0]
    offset_y = bbox[1]

    # Create grayscale mask for text
    pad = 8
    full_w = w + pad * 2
    full_h = h + pad * 2
    mask = Image.new("L", (full_w, full_h), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.text((pad - offset_x, pad - offset_y), text, font=font, fill=255)

    # Generate gradient base image
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
    root_dir = r"C:\Users\Rami\Desktop\Repositorio Elementales Comunidad\Elementales-comunidad"
    font_path = os.path.join(root_dir, "public", "assets", "fonts", "Outfit.ttf")
    logo_path = os.path.join(root_dir, "public", "assets", "logo_icon.png")
    photo_path = os.path.join(root_dir, "public", "assets", "products", "aceite_lorenzo_mesa.jpg")
    output_path = os.path.join(root_dir, "public", "assets", "products", "flyer_oliva_noviembre.jpg")
    artifact_path = r"C:\Users\Rami\.gemini\antigravity\brain\6aae8b24-5824-4a75-9321-ac52a81a3a00\flyer_oliva_noviembre.jpg"

    # Canvas dimensions: 1080 x 1350 (4:5 Instagram & WhatsApp portrait)
    W, H = 1080, 1350
    canvas = Image.new("RGBA", (W, H), (250, 248, 244, 255))

    # Subtle textured paper gradient background: warm cream to slight parchment
    for y in range(H):
        t = y / H
        r = int(251 - t * 7)
        g = int(249 - t * 8)
        b = int(244 - t * 10)
        draw = ImageDraw.Draw(canvas)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # Load fonts at various sizes
    font_eyebrow = ImageFont.truetype(font_path, 15)
    font_header_title = ImageFont.truetype(font_path, 27)
    font_header_sub = ImageFont.truetype(font_path, 14)
    font_hero_l1 = ImageFont.truetype(font_path, 56)
    font_hero_l2 = ImageFont.truetype(font_path, 74)
    font_hero_sub = ImageFont.truetype(font_path, 18)
    
    font_tier_vol = ImageFont.truetype(font_path, 16)
    font_tier_name = ImageFont.truetype(font_path, 14)
    font_tier_price = ImageFont.truetype(font_path, 42)
    font_tier_unit = ImageFont.truetype(font_path, 14)
    font_badge = ImageFont.truetype(font_path, 12)
    
    font_date_header = ImageFont.truetype(font_path, 15)
    font_date_main = ImageFont.truetype(font_path, 22)
    font_date_detail = ImageFont.truetype(font_path, 14)
    font_cta = ImageFont.truetype(font_path, 21)

    draw = ImageDraw.Draw(canvas)

    # ----------------------------------------------------
    # 1. HEADER HORIZONTAL COMPACTO (Ahorra espacio vertical)
    # Logo al costado de "ELEMENTALES COMUNIDAD"
    # ----------------------------------------------------
    header_y = 42
    logo_img = Image.open(logo_path).convert("RGBA")
    logo_h = 56
    logo_w = int(logo_img.width * (logo_h / logo_img.height))
    logo_resized = logo_img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    
    # Calculate combined header width to center it gracefully
    title_text = "ELEMENTALES COMUNIDAD"
    sub_text = "COMPRAS COLECTIVAS  ·  RED BARRIAL DE PRODUCTORES"
    t_bbox = font_header_title.getbbox(title_text)
    title_w = t_bbox[2] - t_bbox[0]
    total_header_w = logo_w + 18 + title_w
    header_start_x = (W - total_header_w) // 2

    # Paste logo
    canvas.alpha_composite(logo_resized, (header_start_x, header_y))

    # Header text block next to logo
    text_x = header_start_x + logo_w + 18
    # Title with subtle gradient (oliva oscuro a bronce)
    grad_htitle, ox, oy = create_gradient_text(title_text, font_header_title, (28, 44, 18), (68, 86, 32), horizontal=True)
    canvas.alpha_composite(grad_htitle, (text_x - ox, header_y + 2 - oy))
    
    draw.text((text_x, header_y + 36), sub_text, font=font_header_sub, fill=(115, 125, 98, 255))

    # Subtle dividing hairline
    draw.line([(70, 116), (W - 70, 116)], fill=(222, 216, 204, 255), width=1)

    # ----------------------------------------------------
    # 2. HERO TITULAR CON FUERZA Y DEGRADÉ DE IMPRENTA
    # Estética descontracturada, letras grandes y jerarquía
    # ----------------------------------------------------
    eyebrow_text = "LOTE LIMITADO  ·  COSECHA FRESCA MENDOZA"
    eb_bbox = font_eyebrow.getbbox(eyebrow_text)
    eb_w = eb_bbox[2] - eb_bbox[0]
    draw.text(((W - eb_w) // 2, 134), eyebrow_text, font=font_eyebrow, fill=(142, 114, 52, 255))

    # "ACEITE de OLIVA"
    title_l1 = "ACEITE DE OLIVA"
    grad_l1, ox1, oy1 = create_gradient_text(title_l1, font_hero_l1, (24, 38, 14), (46, 68, 26), horizontal=True)
    l1_bbox = font_hero_l1.getbbox(title_l1)
    l1_w = l1_bbox[2] - l1_bbox[0]
    canvas.alpha_composite(grad_l1, ((W - l1_w) // 2 - ox1, 156 - oy1))

    # "EXTRA VIRGEN" - Con gran degradé metalizado oliva-dorado (inspirado en afiche imprenta)
    title_l2 = "EXTRA VIRGEN"
    # Degradé desde verde oliva oscuro (26, 42, 16) hasta un oliva dorado vivo (166, 133, 44)
    grad_l2, ox2, oy2 = create_gradient_text(title_l2, font_hero_l2, (28, 48, 16), (170, 138, 46), horizontal=True)
    l2_bbox = font_hero_l2.getbbox(title_l2)
    l2_w = l2_bbox[2] - l2_bbox[0]
    canvas.alpha_composite(grad_l2, ((W - l2_w) // 2 - ox2, 220 - oy2))

    # Sub-titular con detalles del productor y método
    sub_product = "LORENZO CABRERA  ·  PRIMERA PRENSADA EN FRÍO  ·  MAIPÚ, MZA"
    sp_bbox = font_hero_sub.getbbox(sub_product)
    sp_w = sp_bbox[2] - sp_bbox[0]
    draw.text(((W - sp_w) // 2, 304), sub_product, font=font_hero_sub, fill=(84, 98, 68, 255))

    # ----------------------------------------------------
    # 3. IMAGEN HERO CON GRAN FUERZA (MESA RÚSTICA CON ACEITUNAS Y BIDÓN)
    # ----------------------------------------------------
    img_y = 338
    img_w, img_h = 960, 430
    img_x = (W - img_w) // 2

    # Load and crop product photo
    photo = Image.open(photo_path).convert("RGBA")
    
    # Resize keeping aspect ratio, center crop
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

    # Mask with rounded corners
    corner_r = 20
    mask_rounded = create_rounded_rect_mask((img_w, img_h), corner_r)
    photo_cropped.putalpha(mask_rounded)

    # Soft ambient shadow behind the image
    shadow_pad = 12
    shadow = Image.new("RGBA", (img_w + shadow_pad * 2, img_h + shadow_pad * 2), (0, 0, 0, 0))
    draw_sh = ImageDraw.Draw(shadow)
    draw_sh.rounded_rectangle([shadow_pad - 2, shadow_pad + 2, shadow_pad + img_w + 2, shadow_pad + img_h + 6], 
                              radius=corner_r + 2, fill=(0, 0, 0, 45))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    canvas.alpha_composite(shadow, (img_x - shadow_pad, img_y - shadow_pad + 4))

    # Paste rounded photo
    canvas.alpha_composite(photo_cropped, (img_x, img_y))

    # Subtle border outline
    draw.rounded_rectangle([img_x, img_y, img_x + img_w, img_y + img_h], radius=corner_r, outline=(215, 207, 192, 255), width=2)

    # Overlay badge on top-right of image: "100% Puro & Artesanal"
    badge_tag = "100% PURO & AGROECOLÓGICO"
    bt_bbox = font_badge.getbbox(badge_tag)
    bt_w = bt_bbox[2] - bt_bbox[0]
    tag_bg_w = bt_w + 24
    tag_bg_h = 28
    tag_x = img_x + img_w - tag_bg_w - 18
    tag_y = img_y + 18
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tag_bg_w, tag_y + tag_bg_h], radius=6, fill=(28, 42, 16, 215))
    draw.text((tag_x + 12, tag_y + 6), badge_tag, font=font_badge, fill=(245, 240, 228, 255))

    # ----------------------------------------------------
    # 4. VALORES POR LITRO (3 BOTONES/TARJETAS LIMPIAS)
    # Sin duplicación ni errores de tipeo
    # ----------------------------------------------------
    tiers_y = 790
    card_w = 300
    card_h = 166
    gap = (img_w - (card_w * 3)) // 2
    cards_x = [img_x, img_x + card_w + gap, img_x + (card_w + gap) * 2]

    # Data for the 3 clean tiers
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
            # Featured card: Subtle warm olive background with elegant border
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=16, 
                                   fill=(237, 243, 230, 255), outline=(144, 172, 114, 255), width=2)
            
            # Badge "MÁS ELEGIDO"
            b_text = tier["badge"]
            bb = font_badge.getbbox(b_text)
            bw = bb[2] - bb[0]
            bx = cx + (card_w - bw - 20) // 2
            draw.rounded_rectangle([bx, cy - 11, bx + bw + 20, cy + 13], radius=6, fill=(46, 74, 26, 255))
            draw.text((bx + 10, cy - 6), b_text, font=font_badge, fill=(255, 255, 255, 255))

            # Texts inside featured card
            v_bb = font_tier_vol.getbbox(tier["vol"])
            vw = v_bb[2] - v_bb[0]
            draw.text((cx + (card_w - vw) // 2, cy + 22), tier["vol"], font=font_tier_vol, fill=(32, 54, 18, 255))

            n_bb = font_tier_name.getbbox(tier["name"])
            nw = n_bb[2] - n_bb[0]
            draw.text((cx + (card_w - nw) // 2, cy + 44), tier["name"], font=font_tier_name, fill=(84, 108, 64, 255))

            # Price with rich olive tone
            p_bb = font_tier_price.getbbox(tier["price"])
            pw = p_bb[2] - p_bb[0]
            grad_p, opx, opy = create_gradient_text(tier["price"], font_tier_price, (28, 52, 16), (82, 110, 42), horizontal=True)
            canvas.alpha_composite(grad_p, (cx + (card_w - pw) // 2 - opx, cy + 76 - opy))

            u_bb = font_tier_unit.getbbox(tier["unit"])
            uw = u_bb[2] - u_bb[0]
            draw.text((cx + (card_w - uw) // 2, cy + 132), tier["unit"], font=font_tier_unit, fill=(48, 76, 28, 255))

        else:
            # Regular cards: White card with soft border
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=16, 
                                   fill=(255, 255, 255, 255), outline=(225, 218, 206, 255), width=1)

            v_bb = font_tier_vol.getbbox(tier["vol"])
            vw = v_bb[2] - v_bb[0]
            draw.text((cx + (card_w - vw) // 2, cy + 22), tier["vol"], font=font_tier_vol, fill=(78, 88, 68, 255))

            n_bb = font_tier_name.getbbox(tier["name"])
            nw = n_bb[2] - n_bb[0]
            draw.text((cx + (card_w - nw) // 2, cy + 44), tier["name"], font=font_tier_name, fill=(132, 140, 122, 255))

            p_bb = font_tier_price.getbbox(tier["price"])
            pw = p_bb[2] - p_bb[0]
            draw.text((cx + (card_w - pw) // 2, cy + 76), tier["price"], font=font_tier_price, fill=(28, 38, 18, 255))

            u_bb = font_tier_unit.getbbox(tier["unit"])
            uw = u_bb[2] - u_bb[0]
            draw.text((cx + (card_w - uw) // 2, cy + 132), tier["unit"], font=font_tier_unit, fill=(116, 124, 106, 255))

    # ----------------------------------------------------
    # 5. BLOQUE DE FECHAS: CIERRE Y ENTREGAS (Sencillo, limpio)
    # ----------------------------------------------------
    info_y = 980
    info_h = 175
    draw.rounded_rectangle([img_x, info_y, img_x + img_w, info_y + info_h], radius=18,
                           fill=(245, 241, 233, 255), outline=(220, 212, 198, 255), width=1)

    # Header Cierre de pedidos
    cierre_eyebrow = "CIERRE DE COMPRA"
    ce_bb = font_date_header.getbbox(cierre_eyebrow)
    ce_w = ce_bb[2] - ce_bb[0]
    draw.text(((W - ce_w) // 2, info_y + 16), cierre_eyebrow, font=font_date_header, fill=(154, 72, 42, 255))

    cierre_date = "Domingo 1 de Noviembre  ·  23:59 hs"
    cd_bb = font_date_main.getbbox(cierre_date)
    cd_w = cd_bb[2] - cd_bb[0]
    draw.text(((W - cd_w) // 2, info_y + 38), cierre_date, font=font_date_main, fill=(34, 44, 20, 255))

    # Hairline divider inside info box
    draw.line([(img_x + 40, info_y + 78), (img_x + img_w - 40, info_y + 78)], fill=(225, 217, 203, 255), width=1)

    # Entregas en dos columnas: Loma Verde y La Lucila
    col_w = img_w // 2
    
    # Columna Loma Verde
    lv_x = img_x + col_w // 2
    lv_t1 = "ENTREGA NODO LOMA VERDE"
    lv_t2 = "Viernes 6 de Noviembre  ·  9 a 13 hs"
    lv_t3 = "Botafogo 1320, Loma Verde"

    b1 = font_date_header.getbbox(lv_t1)
    draw.text((lv_x - (b1[2]-b1[0])//2, info_y + 92), lv_t1, font=font_date_header, fill=(90, 114, 60, 255))
    b2 = font_date_detail.getbbox(lv_t2)
    draw.text((lv_x - (b2[2]-b2[0])//2, info_y + 114), lv_t2, font=font_date_detail, fill=(26, 36, 16, 255))
    b3 = font_date_detail.getbbox(lv_t3)
    draw.text((lv_x - (b3[2]-b3[0])//2, info_y + 136), lv_t3, font=font_date_detail, fill=(116, 126, 106, 255))

    # Divider vertical between columns
    draw.line([(W // 2, info_y + 88), (W // 2, info_y + 160)], fill=(225, 217, 203, 255), width=1)

    # Columna La Lucila
    ll_x = img_x + col_w + col_w // 2
    ll_t1 = "ENTREGA NODO LA LUCILA"
    ll_t2 = "Sábado 7 de Noviembre  ·  10 a 14 hs"
    ll_t3 = "Anchorena 684, La Lucila"

    b4 = font_date_header.getbbox(ll_t1)
    draw.text((ll_x - (b4[2]-b4[0])//2, info_y + 92), ll_t1, font=font_date_header, fill=(90, 114, 60, 255))
    b5 = font_date_detail.getbbox(ll_t2)
    draw.text((ll_x - (b5[2]-b5[0])//2, info_y + 114), ll_t2, font=font_date_detail, fill=(26, 36, 16, 255))
    b6 = font_date_detail.getbbox(ll_t3)
    draw.text((ll_x - (b6[2]-b6[0])//2, info_y + 136), ll_t3, font=font_date_detail, fill=(116, 126, 106, 255))

    # ----------------------------------------------------
    # 6. LLAMADO A LA ACCIÓN FINAL (SIN FOOTER OSCURO)
    # Un botón estilizado con degradé oliva y tipografía limpia
    # ----------------------------------------------------
    btn_w = 640
    btn_h = 72
    btn_x = (W - btn_w) // 2
    btn_y = 1195

    # Button gradient: dark olive to rich forest olive
    btn_grad = Image.new("RGBA", (btn_w, btn_h))
    r_start, g_start, b_start = (32, 54, 18)
    r_end, g_end, b_end = (68, 98, 42)
    for x in range(btn_w):
        factor = x / btn_w
        r = int(r_start + (r_end - r_start) * factor)
        g = int(g_start + (g_end - g_start) * factor)
        b = int(b_start + (b_end - b_start) * factor)
        for y in range(btn_h):
            btn_grad.putpixel((x, y), (r, g, b, 255))
    
    btn_mask = create_rounded_rect_mask((btn_w, btn_h), 36)
    btn_grad.putalpha(btn_mask)

    # Soft button shadow
    btn_shadow = Image.new("RGBA", (btn_w + 16, btn_h + 16), (0, 0, 0, 0))
    draw_bsh = ImageDraw.Draw(btn_shadow)
    draw_bsh.rounded_rectangle([8, 8, 8 + btn_w, 8 + btn_h], radius=36, fill=(0, 0, 0, 35))
    btn_shadow = btn_shadow.filter(ImageFilter.GaussianBlur(6))
    canvas.alpha_composite(btn_shadow, (btn_x - 8, btn_y - 4))

    # Paste button
    canvas.alpha_composite(btn_grad, (btn_x, btn_y))

    # Button text: "Hacé tu pedido en elementales.store/oliva"
    cta_text = "Hacé tu pedido en elementales.store/oliva"
    cta_bb = font_cta.getbbox(cta_text)
    cta_w = cta_bb[2] - cta_bb[0]
    draw.text((btn_x + (btn_w - cta_w) // 2, btn_y + 24), cta_text, font=font_cta, fill=(255, 255, 255, 255))

    # Subtle footer baseline note
    footer_sub = "Participá de la compra colectiva directa del productor · Sin intermediarios"
    fsub_bb = font_badge.getbbox(footer_sub)
    fsub_w = fsub_bb[2] - fsub_bb[0]
    draw.text(((W - fsub_w) // 2, 1284), footer_sub, font=font_badge, fill=(145, 153, 138, 255))

    # Convert to RGB and save high quality JPEG
    final_img = canvas.convert("RGB")
    final_img.save(output_path, "JPEG", quality=95, optimize=True)
    final_img.save(artifact_path, "JPEG", quality=95, optimize=True)
    print(f"Successfully generated flyer at: {output_path}")
    print(f"Copied to artifact path: {artifact_path}")

if __name__ == "__main__":
    main()
