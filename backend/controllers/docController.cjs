const { degrees, PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fetch = require("node-fetch");
const { updateWalletforOnedoc } = require("./authController.cjs");

async function addWatermarkToPDF(username, email) {
  // Fetch the original PDF
  const url =
    "https://drive.google.com/uc?id=1ePcmtMY_7pc9r-wT8gj5fTti1viAwWzv";
  const response = await fetch(url);
  const originalPdfBytes = await response.arrayBuffer();

  // Load the original PDF
  const originalPdfDoc = await PDFDocument.load(originalPdfBytes);

  // Embed the font
  const helveticaFont = await originalPdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the pages of the original PDF
  const originalPages = originalPdfDoc.getPages();
  const pageCount = originalPages.length;
  console.log(`Page count: ${pageCount}`);

  // Add the watermark to each page
  for (const originalPage of originalPages) {
    const { width, height } = originalPage.getSize();

    originalPage.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: height,
      borderColor: rgb(0, 0, 0),
      borderWidth: 2,
    });

    originalPage.drawText(email, {
      x: 2,
      y: height / 2,
      size: 6,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(-90),
    });

    originalPage.drawText(email, {
      x: width / 2 - 150,
      y: height / 2 - 250,
      size: 70,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(45),
      opacity: 0.2,
    });

    originalPage.drawText(email, {
      x: width / 2 - 150,
      y: height / 2 + 50,
      size: 70,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(45),
      opacity: 0.2,
    });
  }

  // return the PDF
  const pdfBytes = await originalPdfDoc.save();
  return pdfBytes;
}

exports.getDoc = async (req, res) => {
  try {
    const { username, email } = req.body;
    // const updatewalletResponse = await updateWalletforOnedoc(
    //   { body: { email } },
    //   {
    //     status: (statusCode) => ({
    //       json: (data) => ({ statusCode, data }),
    //     }),
    //   }
    // );
    // if (updatewalletResponse.statusCode === 200) {
    const pdfBytes = await addWatermarkToPDF(username, email);
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
    // } else {
    //   res
    //     .status(updatewalletResponse.statusCode)
    //     .json(updatewalletResponse.data);
    // }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
