import json


ALLOWED_NODES = {
    "blockquote",
    "bulletList",
    "codeBlock",
    "doc",
    "hardBreak",
    "heading",
    "listItem",
    "orderedList",
    "paragraph",
    "text",
}
ALLOWED_MARKS = {"bold", "italic", "link", "code"}
ALLOWED_PROTOCOLS = ("http:", "https:", "mailto:")


def sanitize_rich_text(value):
    """Keep supported Tiptap JSON nodes and safe link attributes."""
    if not value:
        return ""

    try:
        document = json.loads(value)
    except (TypeError, json.JSONDecodeError):
        return value[:5000]

    def clean_node(node):
        if not isinstance(node, dict) or node.get("type") not in ALLOWED_NODES:
            return None

        cleaned = {"type": node["type"]}
        if node["type"] == "text":
            cleaned["text"] = str(node.get("text", ""))[:5000]

        if node.get("type") == "heading" and node.get("attrs", {}).get("level") in (1, 2, 3):
            cleaned["attrs"] = {"level": node["attrs"]["level"]}

        if node.get("type") == "link":
            href = node.get("attrs", {}).get("href", "")
            if isinstance(href, str) and href.lower().startswith(ALLOWED_PROTOCOLS):
                cleaned["attrs"] = {"href": href}

        cleaned_marks = []
        for mark in node.get("marks", []):
            if not isinstance(mark, dict) or mark.get("type") not in ALLOWED_MARKS:
                continue
            if mark["type"] == "link":
                href = mark.get("attrs", {}).get("href", "")
                if not isinstance(href, str) or not href.lower().startswith(ALLOWED_PROTOCOLS):
                    continue
                cleaned_marks.append({"type": "link", "attrs": {"href": href}})
            else:
                cleaned_marks.append({"type": mark["type"]})
        if cleaned_marks:
            cleaned["marks"] = cleaned_marks

        children = [clean_node(child) for child in node.get("content", [])]
        cleaned_children = [child for child in children if child]
        if cleaned_children:
            cleaned["content"] = cleaned_children
        return cleaned

    cleaned_document = clean_node(document)
    if not cleaned_document or cleaned_document.get("type") != "doc":
        return ""
    cleaned_value = json.dumps(cleaned_document, separators=(",", ":"))
    return cleaned_value if len(cleaned_value) <= 5000 else ""
