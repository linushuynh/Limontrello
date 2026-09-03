import React, { useCallback, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import styles from "./RichTextEditor.module.css";

const toDocument = (value) => {
    if (!value) return { type: "doc", content: [{ type: "paragraph" }] };

    try {
        const parsed = JSON.parse(value);
        if (parsed?.type === "doc") return parsed;
    } catch (error) {
        // Existing descriptions are plain text and are handled below.
    }

    return {
        type: "doc",
        content: [{
            type: "paragraph",
            content: [{ type: "text", text: value }]
        }]
    };
};

const ToolbarButton = ({ label, onClick, active, children }) => (
    <button
        type="button"
        className={`${styles.toolbarButton} ${active ? styles.activeButton : ""}`}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClick}
        aria-label={label}
        title={label}
    >
        {children}
    </button>
);

const RichTextEditor = ({ value, onChange, onTextChange, placeholder, editable = true }) => {
    const updateContent = useCallback(({ editor }) => {
        onChange(JSON.stringify(editor.getJSON()));
        onTextChange?.(editor.getText().trim().length);
    }, [onChange, onTextChange]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                protocols: ["http", "https", "mailto"]
            }),
            Placeholder.configure({ placeholder: placeholder || "Write something..." })
        ],
        content: toDocument(value),
        editable,
        onCreate: ({ editor: createdEditor }) => {
            onTextChange?.(createdEditor.getText().trim().length);
        },
        onUpdate: updateContent
    });

    useEffect(() => {
        if (!editor) return undefined;

        editor.setEditable(editable);
        if (!editable) {
            editor.commands.blur();
            return undefined;
        }

        const focusEditor = window.requestAnimationFrame(() => {
            editor.commands.focus("end");
        });
        return () => window.cancelAnimationFrame(focusEditor);
    }, [editable, editor]);

    if (!editor) return null;

    const addLink = () => {
        const currentLink = editor.getAttributes("link").href || "";
        const href = window.prompt("Link URL", currentLink);
        if (href === null) return;
        if (href.trim() === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }
        editor.chain().focus().setLink({ href: href.trim() }).run();
    };

    return (
        <div className={`${styles.editorContainer} ${editable ? styles.editing : styles.readOnly}`}>
            {editable && (
                <div className={styles.toolbar} aria-label="Formatting toolbar">
                    <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
                        <strong>B</strong>
                    </ToolbarButton>
                    <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
                        <em>I</em>
                    </ToolbarButton>
                    <ToolbarButton label="Heading" active={editor.isActive("heading")} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                        H
                    </ToolbarButton>
                    <ToolbarButton label="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        <span className="material-symbols-outlined">format_list_bulleted</span>
                    </ToolbarButton>
                    <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        <span className="material-symbols-outlined">format_list_numbered</span>
                    </ToolbarButton>
                    <ToolbarButton label="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                        <span className="material-symbols-outlined">code</span>
                    </ToolbarButton>
                    <ToolbarButton label="Add link" active={editor.isActive("link")} onClick={addLink}>
                        <span className="material-symbols-outlined">link</span>
                    </ToolbarButton>
                </div>
            )}
            <EditorContent editor={editor} className={styles.editorContent} />
        </div>
    );
};

export default RichTextEditor;
