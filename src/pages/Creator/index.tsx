import React, { useState } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

export const Creator: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file || !file.name.endsWith(".md")) {
      setStatus("error");
      setMessage("Please drop a valid .md markdown file.");
      return;
    }

    setStatus("uploading");

    try {
      const text = await file.text();
      const response = await fetch("/api/convert-md", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: text,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        setMessage(
          `Successfully converted to ${data.slug}.tsx! Check your posts folder.`,
        );
      } else {
        throw new Error(data.error || "Failed to convert file");
      }
    } catch (err) {
      setStatus("error");
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 pt-32 dark:bg-stone-950">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-50 md:text-5xl">
            Post{" "}
            <span className="font-light italic text-stone-500">Creator.</span>
          </h1>
          <p className="mt-4 text-stone-600 dark:text-stone-400">
            Drag and drop a Markdown (.md) file here to instantly convert it
            into a React TSX post component.
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            rounded-xl border-2 border-dashed p-16 text-center transition-all duration-300
            ${
              isDragging
                ? "border-stone-900 bg-stone-50 dark:border-stone-100 dark:bg-stone-900"
                : "border-stone-200 bg-transparent hover:border-stone-300 dark:border-stone-800 dark:hover:border-stone-700"
            }
          `}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            {status === "success" ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : status === "error" ? (
              <AlertCircle className="h-16 w-16 text-red-500" />
            ) : (
              <div className="rounded-full bg-stone-100 p-4 dark:bg-stone-900">
                <Upload
                  className={`h-8 w-8 ${isDragging ? "animate-bounce text-stone-900 dark:text-stone-100" : "text-stone-400"}`}
                />
              </div>
            )}

            <div className="mt-4">
              {status === "uploading" ? (
                <p className="text-lg font-medium text-stone-900 dark:text-stone-100">
                  Converting...
                </p>
              ) : status === "success" ? (
                <div>
                  <p className="text-lg font-medium text-stone-900 dark:text-stone-100">
                    Conversion Complete
                  </p>
                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                    {message}
                  </p>
                </div>
              ) : status === "error" ? (
                <div>
                  <p className="text-lg font-medium text-red-500">Error</p>
                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                    {message}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium text-stone-900 dark:text-stone-100">
                    Drop your markdown file here
                  </p>
                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                    Supports frontmatter metadata and standard markdown
                  </p>
                </>
              )}
            </div>

            {status !== "uploading" && status !== "idle" && (
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-md border border-stone-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900"
              >
                Upload another file
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
