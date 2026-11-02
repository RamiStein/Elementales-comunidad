/**
 * =========================================================================
 * ELEMENTALES COMUNIDAD - CÓDIGO DE GOOGLE APPS SCRIPT PARA GOOGLE SHEETS
 * =========================================================================
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN (Toma solo 2 minutos):
 * 1. Abrí tu navegador y andá a https://sheets.new (crea una planilla nueva).
 * 2. Ponéle de nombre a la planilla: "Pedidos Elementales Comunidad".
 * 3. En el menú superior de la planilla, hacé clic en: Extensiones > Apps Script.
 * 4. Borrá todo el código que aparezca en el editor (el 'function myFunction()').
 * 5. Pegá TODO este archivo completo en el editor de Apps Script.
 * 6. Hacé clic en el botón azul "Implementar" (arriba a la derecha) > "Nueva implementación".
 * 7. En el engranaje "Seleccionar tipo", elegí: "Aplicación web".
 * 8. Completá los campos:
 *    - Descripción: "Webhook Pedidos Elementales"
 *    - Ejecutar como: "Yo (tu cuenta de Google)"
 *    - Quién tiene acceso: "Cualquier usuario" (o "Anyone")  <--- ¡MUY IMPORTANTE!
 * 9. Hacé clic en "Implementar". Google te va a pedir autorizar permisos con tu cuenta.
 * 10. Copiá la "URL de la aplicación web" (termina en /exec) y pegála en tu panel de gestión
 *     (botón "⚙️ Conectar Google Sheets").
 * 
 * ¡Listo! Cada vez que alguien pida en la web, se agregará un renglón automáticamente en tu Excel.
 */

var SHEET_NAME = "Pedidos_Elementales";

// -----------------------------------------------------------------------------
// 1. LECTURA DE PEDIDOS (GET): El Panel de Gestión consulta este endpoint
// -----------------------------------------------------------------------------
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = rows[0];
    var orders = [];
    
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if (!row[0] && !row[2]) continue; // Saltear filas vacías
      
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var key = String(headers[j]).trim();
        obj[key] = row[j];
      }
      orders.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify(orders))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// -----------------------------------------------------------------------------
// 2. REGISTRO DE PEDIDOS (POST): oliva.html y frutilla.html envían aquí la compra
// -----------------------------------------------------------------------------
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    // Crear encabezados si la hoja es nueva o está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha",
        "Hora",
        "Ticket_ID",
        "Tipo",
        "Cliente",
        "Telefono",
        "Email",
        "Producto",
        "Litros_Kg",
        "Escala",
        "Total",
        "Aporte_Org",
        "Forma_Pago",
        "Nodo_Retiro",
        "Ser_Elemental",
        "Domicilio",
        "Notas",
        "Estado",
        "Timestamp"
      ]);
      // Estilo institucional verde oliva de Elementales
      sheet.getRange(1, 1, 1, 19)
        .setBackground("#3e531c")
        .setFontColor("#ffffff")
        .setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var addr = "";
    if (data.clientAddress) {
      addr = typeof data.clientAddress === "object" ? (data.clientAddress.full || data.clientAddress.street || "") : String(data.clientAddress);
    }
    
    var qty = Number(data.liters || data.kg || 1);
    var scale = data.tierName || (qty >= 20 ? "Comunitaria (+20L)" : (qty >= 6 ? "Familiar (+6L)" : "Pequeña (1 a 5L)"));
    
    sheet.appendRow([
      data.dateStr || Utilities.formatDate(new Date(), "America/Argentina/Buenos_Aires", "dd/MM/yyyy"),
      data.timeStr || Utilities.formatDate(new Date(), "America/Argentina/Buenos_Aires", "HH:mm"),
      data.id || ("ORD-" + new Date().getTime().toString(36).toUpperCase()),
      data.type || "lunar",
      data.clientName || "Vecin@",
      data.clientPhone || "",
      data.clientEmail || "",
      data.productName || "Aceite de Oliva Extra Virgen Lorenzo Cabrera",
      qty,
      scale,
      data.total || 0,
      data.communityContribution || data.donation || 0,
      data.paymentMethod || "Transferencia",
      data.nodoNombre || "Nodo La Lucila",
      data.serElemental || "Bauti",
      addr,
      data.notes || "",
      data.status || "Confirmado",
      data.timestamp || new Date().getTime()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", id: data.id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
