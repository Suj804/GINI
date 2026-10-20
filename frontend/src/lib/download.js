const triggerDownload = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const downloadContent = async (content, type = "article", name = "gini-output") => {
  const fileName = `${name}-${Date.now()}`;

  if (type === "image") {
    try {
      const res = await fetch(content);
      const blob = await res.blob();
      const ext = (blob.type.split("/")[1] || "png").split("+")[0];
      triggerDownload(blob, `${fileName}.${ext}`);
    } catch {
      // Cross-origin image that blocks fetch: open it so the user can save it
      window.open(content, "_blank", "noopener,noreferrer");
    }
    return;
  }

  triggerDownload(
    new Blob([content], { type: "text/markdown;charset=utf-8" }),
    `${fileName}.md`
  );
};
