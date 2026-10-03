import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { WizardFormData } from "@/types/wizard";

const romanMonths = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

function parseLocalDate(value: string | undefined): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date: Date | null): string {
  if (!date) return "-";
  const formatted = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function numberInIndonesian(value: number): string {
  const words = [
    "Nol",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
  ];
  return words[value] ?? String(value);
}

function addWrappedText(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
): number {
  pdf.setFontSize(fontSize);
  const lines = pdf.splitTextToSize(text || "-", maxWidth);
  pdf.text(lines, x, y);
  return lines.length * lineHeight;
}

export function generateSkhpPdf(formData: WizardFormData | undefined): jsPDF {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 19;
  const labelX = margin;
  const colonX = 66;
  const valueX = 70;
  const valueWidth = pageWidth - margin - valueX;
  const pengujian = formData?.step1.dataPengujian;
  const identitas = formData?.step1.identitasUTTP;
  const nozzle = formData?.step2.dataNozzle;
  const totalisator = formData?.step2.totalisator;
  const tanggalUji = parseLocalDate(pengujian?.tanggalPengujian);
  const nomorOrder = pengujian?.nomorOrder || "-";
  const nomorSurat = `PG.05.06/${nomorOrder}/${tanggalUji ? romanMonths[tanggalUji.getMonth()] : "-"}/${tanggalUji?.getFullYear() ?? "-"}`;
  const jumlahNozzle = Number.parseInt(identitas?.jumlahNozzle || "", 10);
  const jumlahNozzleText =
    Number.isInteger(jumlahNozzle) && jumlahNozzle >= 0
      ? `${jumlahNozzle} (${numberInIndonesian(jumlahNozzle)})`
      : identitas?.jumlahNozzle || "-";
  const tanggalBerlaku = tanggalUji
    ? new Date(
        tanggalUji.getFullYear() + 1,
        tanggalUji.getMonth(),
        tanggalUji.getDate(),
      )
    : null;
  const masaBerlaku = tanggalBerlaku
    ? tanggalBerlaku
        .toLocaleDateString("id-ID", { month: "long", year: "numeric" })
        .toUpperCase()
    : "-";
  const adaHasilTidakLulus =
    formData?.step1.checklist.some((item) => item.penilaian === "tidak") ||
    formData?.step2.cerapan.some((item) => item.status === "tidak_lolos") ||
    false;

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(20, 20, 20);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("PEMERINTAH KOTA BANDUNG", pageWidth / 2, 17, { align: "center" });
  pdf.setFontSize(10);
  pdf.text(
    "DINAS PERDAGANGAN DAN PERINDUSTRIAN",
    pageWidth / 2,
    23,
    { align: "center" },
  );
  pdf.setFontSize(11);
  pdf.text("UPT. METROLOGI LEGAL", pageWidth / 2, 29, { align: "center" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("Jl. Pandu No. 32, Kota Bandung 40173", pageWidth / 2, 34, {
    align: "center",
  });
  pdf.text(
    "Telp/Fax. (022) 20572330, e-mail: metrologi.kotabandung@gmail.com",
    pageWidth / 2,
    38,
    { align: "center" },
  );
  pdf.setLineWidth(0.45);
  pdf.line(margin, 43, pageWidth - margin, 43);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  const title = "SURAT KETERANGAN HASIL PENGUJIAN";
  pdf.text(title, pageWidth / 2, 58, { align: "center" });
  const titleWidth = pdf.getTextWidth(title);
  pdf.setLineWidth(0.25);
  pdf.line(
    pageWidth / 2 - titleWidth / 2,
    58.8,
    pageWidth / 2 + titleWidth / 2,
    58.8,
  );
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(`Nomor: ${nomorSurat}`, pageWidth / 2, 63, { align: "center" });

  const addBilingualLabel = (
    label: string,
    translation: string,
    y: number,
  ) => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(label, labelX, y);
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(5);
    pdf.setTextColor(130, 90, 90);
    pdf.text(translation, labelX, y + 3);
    pdf.setTextColor(20, 20, 20);
  };

  const addField = (
    label: string,
    translation: string,
    value: string,
    y: number,
    options: { width?: number; fontSize?: number; bold?: boolean } = {},
  ): number => {
    addBilingualLabel(label, translation, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(":", colonX, y);
    pdf.setFont("helvetica", options.bold ? "bold" : "normal");
    const height = addWrappedText(
      pdf,
      value,
      valueX,
      y,
      options.width ?? valueWidth,
      options.fontSize ?? 8,
      3.7,
    );
    return Math.max(7, height + 1);
  };

  pdf.setDrawColor(30, 30, 30);
  pdf.setLineWidth(0.25);
  pdf.rect(pageWidth - margin - 48, 69, 48, 9);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("Nomor Order :", pageWidth - margin - 46, 74.5);
  pdf.text(nomorOrder, pageWidth - margin - 4, 74.5, { align: "right" });

  let y = 75;
  y += addField(
    "NAMA ALAT",
    "Measuring Instrument",
    `${jumlahNozzleText} Nozzle Pompa Ukur BBM`,
    y,
    { width: 66 },
  );
  y += addField("Merek / Buatan", "Trade Mark / Manufacturer", "Terlampir", y, {
    width: 66,
  });
  y += addField("Model / Tipe", "Model / Type", "Terlampir", y, { width: 66 });
  y += addField("Nomor Seri", "Serial Number", "Terlampir", y, { width: 66 });
  y += addField(
    "Kapasitas / Massa Nominal",
    "Capacity / Nominal Mass",
    "Terlampir",
    y,
    { width: 66 },
  );

  const pemakai =
    `SPBU ${pengujian?.noSPBU || "-"} / ${pengujian?.namaPemilik || "-"}`;
  y += 2;
  y += addField("PEMAKAI", "Owner / User", pemakai, y, { bold: true });
  y += addField(
    "A l a m a t",
    "Address",
    pengujian?.alamatTerpasang || "-",
    y,
  );

  y += 2;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text("METODA, STANDAR DAN TELUSURAN", labelX, y);
  y += 5;
  y += addField(
    "Metoda",
    "Method",
    "Surat Keputusan Direktur Jenderal Perlindungan Konsumen dan Tertib Niaga No. 5 Tahun 2026 tentang Syarat Teknis Pompa Ukur Bahan Bakar Minyak dan Pompa Ukur Elpiji",
    y,
  );
  y += addField(
    "Standar",
    "Standard",
    "Bejana Ukur Standar 20 Liter",
    y,
  );
  y += addField(
    "Telusuran",
    "Traceability",
    "Hasil pengujian tera/tera ulang yang dilaporkan tertelusur ke satuan pengukuran SI melalui Direktorat Metrologi",
    y,
  );

  y += 2;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text("Hasil Pengujian :", labelX, y);
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(5);
  pdf.setTextColor(130, 90, 90);
  pdf.text("Result of Verification", labelX, y + 3);
  pdf.setTextColor(20, 20, 20);

  const resultText = adaHasilTidakLulus
    ? "Hasil tera/tera ulang menunjukkan bahwa Pompa Ukur BBM belum memenuhi persyaratan teknis."
    : `Disahkan pada Tera Ulang Tahun ${tanggalUji?.getFullYear() ?? "-"} berdasarkan Undang-Undang Republik Indonesia Nomor 2 Tahun 1981 tentang Metrologi Legal, dengan dibubuhi tanda tera sah oleh petugas yang berwenang.`;
  y += addWrappedText(pdf, resultText, valueX - 3, y, valueWidth + 3, 8, 3.8);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(
    "Surat Keterangan Hasil Pengujian ini berlaku sampai dengan",
    labelX,
    y + 2,
  );
  pdf.setFont("helvetica", "bold");
  pdf.text(masaBerlaku, 135, y + 2);

  const appendixHeadingY = y + 11;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text("DATA PENGUJIAN TERA / TERA ULANG", margin + 10, appendixHeadingY);

  const appendixColumnWidth =
    (pageWidth - margin - (margin + 10) - 12) / 2;
  const addAppendixField = (
    label: string,
    value: string,
    x: number,
    fieldY: number,
  ): number => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.2);
    pdf.text(label, x, fieldY);
    pdf.text(":", x + 28, fieldY);
    const lines = pdf.splitTextToSize(value || "-", appendixColumnWidth - 31);
    pdf.text(lines, x + 31, fieldY);
    return Math.max(4.2, lines.length * 3.1);
  };

  const leftColumnX = margin + 10;
  const rightColumnX = leftColumnX + appendixColumnWidth + 12;
  let appendixY = appendixHeadingY + 6;
  const firstRowHeight = Math.max(
    addAppendixField(
      "Tanggal ditera/tera ulang",
      formatDate(tanggalUji),
      leftColumnX,
      appendixY,
    ),
    addAppendixField(
      "Diuji Oleh",
      pengujian?.namaPetugas1 || "-",
      rightColumnX,
      appendixY,
    ),
  );
  appendixY += firstRowHeight + 1;

  const secondRowHeight = Math.max(
    pengujian?.namaPetugas2
      ? addAppendixField(
          "Petugas 2",
          pengujian.namaPetugas2,
          leftColumnX,
          appendixY,
        )
      : 0,
    addAppendixField(
      "Lokasi",
      pengujian?.alamatTerpasang || "-",
      rightColumnX,
      appendixY,
    ),
  );
  appendixY += secondRowHeight + 1;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.2);
  pdf.text("Kondisi Ruangan", leftColumnX, appendixY);
  pdf.text(":", leftColumnX + 28, appendixY);
  pdf.text(
    "Suhu: __________ °C     Kelembaban: __________ %RH",
    leftColumnX + 31,
    appendixY,
  );
  appendixY += 4.2;

  const tableStartY = appendixY + 3;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text("HASIL PENGUJIAN", margin + 10, tableStartY - 6);

  const tableBody = [
    [
      "1",
      identitas?.merek || "-",
      identitas?.tipeModel || "-",
      identitas?.nomorSeri || "-",
      nozzle?.jenisCairan || "-",
      totalisator?.sesudahUji || "-",
    ],
  ];
  autoTable(pdf, {
    startY: tableStartY,
    margin: { left: 24, right: 24 },
    head: [
      [
        "NO.",
        "MEREK",
        "TIPE",
        "NOMOR SERI",
        "JENIS BBM",
        "TOTALISATOR AKHIR",
      ],
    ],
    body: tableBody,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 7,
      cellPadding: 1.5,
      lineColor: [30, 30, 30],
      lineWidth: 0.2,
      textColor: [20, 20, 20],
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fontStyle: "bold",
      fillColor: [255, 255, 255],
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 28 },
      2: { cellWidth: 31 },
      3: { cellWidth: 26 },
      4: { cellWidth: 29 },
      5: { cellWidth: 38 },
    },
  });

  const finalTableY =
    (pdf as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable
      ?.finalY ?? 99;
  const signatureY = finalTableY + 8;
  const officerX = pageWidth * 0.3;
  const headX = pageWidth - margin;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("Penera Terampil,", officerX, signatureY, { align: "center" });
  pdf.text(`Bandung, ${formatDate(tanggalUji)}`, headX, signatureY - 5, {
    align: "right",
  });
  pdf.text("KEPALA UPT. METROLOGI LEGAL", headX, signatureY, {
    align: "right",
  });
  pdf.setLineWidth(0.2);
  pdf.line(officerX - 20, signatureY + 15, officerX + 20, signatureY + 15);
  pdf.line(headX - 45, signatureY + 15, headX, signatureY + 15);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6.5);
  pdf.text(
    pengujian?.namaPetugas1 || "________________________",
    officerX,
    signatureY + 20,
    { align: "center" },
  );
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);
  pdf.text("NIP: ________________________", officerX, signatureY + 24, {
    align: "center",
  });
  pdf.text("Nama: ____________________", headX, signatureY + 20, {
    align: "right",
  });
  pdf.text("NIP: _____________________", headX, signatureY + 24, {
    align: "right",
  });
  pdf.setFontSize(7);
  pdf.text("Catatan :", margin, 284);
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(5);
  pdf.setTextColor(130, 90, 90);
  pdf.text("Notes", margin, 287);
  pdf.setTextColor(20, 20, 20);

  return pdf;
}
