"use client";

import { useEffect, useRef, useState } from "react";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

export function RichTextEditor({ name, defaultValue = "", placeholder }: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const [Editor, setEditor] = useState<any>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { CKEditor } = await import("@ckeditor/ckeditor5-react");
      const {
        ClassicEditor,
        Essentials,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Heading,
        Paragraph,
        Link,
        List,
        BlockQuote,
        Table,
        TableToolbar,
        MediaEmbed,
        Alignment,
        Font,
        Indent,
        IndentBlock,
        HtmlEmbed,
        SourceEditing,
        GeneralHtmlSupport,
      } = await import("ckeditor5");

      if (cancelled) return;

      const editorConfig = {
        licenseKey: "GPL",
        plugins: [
          Essentials,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Heading,
          Paragraph,
          Link,
          List,
          BlockQuote,
          Table,
          TableToolbar,
          MediaEmbed,
          Alignment,
          Font,
          Indent,
          IndentBlock,
          HtmlEmbed,
          SourceEditing,
          GeneralHtmlSupport,
        ],
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "fontSize",
            "fontColor",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "link",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "htmlEmbed",
            "|",
            "sourceEditing",
          ],
          shouldNotGroupWhenFull: false,
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        heading: {
          options: [
            { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
            { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
            { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
            { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
            { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
          ],
        },
        htmlSupport: {
          allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
        },
        placeholder: placeholder || "Start writing content...",
      };

      // Render component
      setEditor(() => ({ CKEditor, ClassicEditor, editorConfig }));
    }

    load();
    return () => { cancelled = true; };
  }, [placeholder]);

  if (!Editor) {
    return (
      <>
        <input type="hidden" name={name} value={value} />
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-600 bg-slate-800">
          <p className="text-sm text-slate-400">Loading editor...</p>
        </div>
      </>
    );
  }

  const { CKEditor, ClassicEditor, editorConfig } = Editor;

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <div className="ckeditor-dark">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onReady={(editor: any) => {
            editorRef.current = editor;
          }}
          onChange={(_event: any, editor: any) => {
            setValue(editor.getData());
          }}
        />
      </div>
    </>
  );
}
