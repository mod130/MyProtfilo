"""
Generates public/resume/Mohammed-Ahmed-CV.pdf — a real, working one-page
resume that mirrors the portfolio's content, so the "Download CV" button
works out of the box. Re-run this script any time the resume content needs
updating (e.g. after editing src/i18n/en.json).
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate,
    PageTemplate,
    Frame,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ---------------------------------------------------------------------------
# Fonts — embed Liberation Sans (metric-compatible open-source equivalent of
# Arial/Helvetica) for cleaner rendering than the base-14 fonts.
# ---------------------------------------------------------------------------
FONT_DIR = "/usr/share/fonts/truetype/liberation/"
pdfmetrics.registerFont(TTFont("Sans", FONT_DIR + "LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", FONT_DIR + "LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Italic", FONT_DIR + "LiberationSans-Italic.ttf"))

# ---------------------------------------------------------------------------
# Brand palette
# ---------------------------------------------------------------------------
PRIMARY = colors.HexColor("#6C63FF")
SECONDARY = colors.HexColor("#8B5CF6")
SIDEBAR_BG = colors.HexColor("#15122b")
INK = colors.HexColor("#181521")
MUTED = colors.HexColor("#5b5768")
WHITE = colors.white
LIGHT_LINE = colors.HexColor("#e7e4f5")

PAGE_W, PAGE_H = A4
SIDEBAR_W = 62 * mm
MAIN_W = PAGE_W - SIDEBAR_W - 10  # small gutter

# ---------------------------------------------------------------------------
# Content (mirrors src/i18n/en.json)
# ---------------------------------------------------------------------------
NAME = "Mohammed Ahmed"
TITLE = "Computer Engineer & IT Support Engineer"
EMAIL = "contact@mohammedahmed.dev"
PHONE = "+966 50 000 0000"
LOCATION = "Saudi Arabia"
LINKEDIN = "in/mohammedahmed-dev"
GITHUB = "mohammedahmed-dev"

SUMMARY = (
    "Computer Engineer specializing in IT support and infrastructure. I enjoy solving "
    "complex problems, automating repetitive tasks, and building systems that stay "
    "reliable under pressure &mdash; from enterprise networks and Active Directory domains "
    "to full-stack web applications."
)

SKILLS = [
    ("Networking", "TCP/IP, Cisco, Routing, Switching"),
    ("Systems", "Windows Server, Active Directory, Microsoft 365, VMware / Hyper-V"),
    ("Programming", "React, JavaScript, PHP, Laravel, Python, MySQL, Tailwind CSS"),
    ("Cybersecurity", "Linux, Network Security, Troubleshooting, Security Fundamentals"),
]

CERTIFICATES = [
    "CCNA &mdash; Cisco Certified Network Associate",
    "Microsoft 365 Certified &mdash; Modern Desktop Administrator Associate",
    "AZ-900 &mdash; Microsoft Azure Fundamentals",
    "ITIL 4 Foundation",
    "CompTIA A+",
    "Google IT Support Professional Certificate",
]

LANGUAGES = ["Arabic (Native)", "English (Professional)"]

EXPERIENCE = [
    {
        "role": "IT Support Engineer",
        "company": "NAQUA Company",
        "period": "2024 &ndash; Present",
        "points": [
            "Deliver first- and second-line IT support across networking, systems and end-user infrastructure.",
            "Administer Active Directory, Microsoft 365 and Windows Server environments for the organization.",
            "Maintain and monitor internal network infrastructure, reducing recurring downtime through proactive fixes.",
            "Document processes and train staff on IT best practices and security hygiene.",
        ],
    },
    {
        "role": "IT Support Intern",
        "company": "University Networking Department",
        "period": "2023",
        "points": [
            "Assisted in the design and maintenance of the university's core networking infrastructure.",
            "Configured and troubleshot switches, routers and DHCP/DNS services in lab environments.",
            "Built internal automation scripts to speed up recurring administrative tasks.",
        ],
    },
]

EDUCATION = {
    "degree": "Bachelor of Computer Engineering",
    "school": "University",
    "period": "2019 &ndash; 2023",
    "detail": "Focus on computer networks, systems architecture and software engineering. Graduation project: an AI-driven Raspberry Pi hologram (Pepper's Ghost technique).",
}

PROJECTS = [
    ("Windows Server Lab", "Full Windows Server 2022 environment with Active Directory, DNS, DHCP and GPO."),
    ("Active Directory Lab", "Multi-tier Active Directory environment following security best practices."),
    ("AI Hologram Teacher", "Raspberry Pi hologram with AI voice interaction &mdash; graduation project."),
    ("Laravel Portfolio Dashboard", "Full-stack admin dashboard for projects, certificates and messages."),
]

# ---------------------------------------------------------------------------
# Styles
# ---------------------------------------------------------------------------
name_style = ParagraphStyle("name", fontName="Sans-Bold", fontSize=21, textColor=WHITE, leading=24)
title_style = ParagraphStyle("title", fontName="Sans", fontSize=10.5, textColor=colors.HexColor("#c9c3ff"), leading=14, spaceBefore=2)

sidebar_heading = ParagraphStyle("sidebar_heading", fontName="Sans-Bold", fontSize=9.5, textColor=colors.HexColor("#a79aff"), leading=12, spaceBefore=14, spaceAfter=6, tracking=0.6)
sidebar_text = ParagraphStyle("sidebar_text", fontName="Sans", fontSize=9, textColor=colors.HexColor("#ded9ff"), leading=13)
sidebar_text_bold = ParagraphStyle("sidebar_text_bold", fontName="Sans-Bold", fontSize=9, textColor=WHITE, leading=13)

section_heading = ParagraphStyle("section_heading", fontName="Sans-Bold", fontSize=12, textColor=PRIMARY, leading=15, spaceBefore=14, spaceAfter=6)
body_text = ParagraphStyle("body_text", fontName="Sans", fontSize=9.3, textColor=INK, leading=13.5)
muted_text = ParagraphStyle("muted_text", fontName="Sans-Italic", fontSize=8.8, textColor=MUTED, leading=12)

job_role = ParagraphStyle("job_role", fontName="Sans-Bold", fontSize=10.3, textColor=INK, leading=13)
job_meta = ParagraphStyle("job_meta", fontName="Sans", fontSize=8.8, textColor=PRIMARY, leading=12, spaceAfter=3)
bullet_style = ParagraphStyle("bullet_style", fontName="Sans", fontSize=9, textColor=INK, leading=13, leftIndent=10, bulletIndent=0, spaceAfter=2)

project_title = ParagraphStyle("project_title", fontName="Sans-Bold", fontSize=9.5, textColor=INK, leading=13)
project_desc = ParagraphStyle("project_desc", fontName="Sans", fontSize=8.7, textColor=MUTED, leading=12, spaceAfter=6)


def build_sidebar():
    story = []
    story.append(Paragraph(NAME, name_style))
    story.append(Paragraph(TITLE, title_style))
    story.append(Spacer(1, 14))

    story.append(Paragraph("CONTACT", sidebar_heading))
    for label, value in [("Email", EMAIL), ("Phone", PHONE), ("Location", LOCATION), ("LinkedIn", LINKEDIN), ("GitHub", GITHUB)]:
        story.append(Paragraph(f'<font color="#a79aff">{label}</font>', sidebar_text))
        story.append(Paragraph(value, sidebar_text_bold))
        story.append(Spacer(1, 5))

    story.append(Paragraph("SKILLS", sidebar_heading))
    for category, items in SKILLS:
        story.append(Paragraph(category, sidebar_text_bold))
        story.append(Paragraph(items, sidebar_text))
        story.append(Spacer(1, 6))

    story.append(Paragraph("CERTIFICATES", sidebar_heading))
    for cert in CERTIFICATES:
        story.append(Paragraph(f"&#8226;&nbsp; {cert}", sidebar_text))
        story.append(Spacer(1, 3))

    story.append(Paragraph("LANGUAGES", sidebar_heading))
    for lang in LANGUAGES:
        story.append(Paragraph(lang, sidebar_text))

    return story


def build_main():
    story = []

    story.append(Paragraph("SUMMARY", section_heading))
    story.append(Paragraph(SUMMARY, body_text))

    story.append(Paragraph("EXPERIENCE", section_heading))
    for job in EXPERIENCE:
        story.append(Paragraph(f'{job["role"]} &mdash; <font color="#6C63FF">{job["company"]}</font>', job_role))
        story.append(Paragraph(job["period"], job_meta))
        for point in job["points"]:
            story.append(Paragraph(f"&#8226;&nbsp; {point}", bullet_style))
        story.append(Spacer(1, 8))

    story.append(Paragraph("EDUCATION", section_heading))
    story.append(Paragraph(f'{EDUCATION["degree"]} &mdash; <font color="#6C63FF">{EDUCATION["school"]}</font>', job_role))
    story.append(Paragraph(EDUCATION["period"], job_meta))
    story.append(Paragraph(EDUCATION["detail"], body_text))

    story.append(Paragraph("FEATURED PROJECTS", section_heading))
    for proj_title, proj_desc in PROJECTS:
        story.append(Paragraph(proj_title, project_title))
        story.append(Paragraph(proj_desc, project_desc))

    return story


def build_pdf(output_path):
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        title=f"{NAME} — CV",
        author=NAME,
    )
    frame = Frame(
        0, 0, PAGE_W, PAGE_H,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        id="full-bleed",
    )
    doc.addPageTemplates([PageTemplate(id="Later", frames=[frame])])

    sidebar_story = build_sidebar()
    main_story = build_main()

    row_height = PAGE_H - 0.4  # tiny buffer to avoid float rounding overflow

    table = Table(
        [[sidebar_story, main_story]],
        colWidths=[SIDEBAR_W, MAIN_W],
        rowHeights=[row_height],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), SIDEBAR_BG),
                ("BACKGROUND", (1, 0), (1, 0), WHITE),
                ("LEFTPADDING", (0, 0), (0, 0), 16),
                ("RIGHTPADDING", (0, 0), (0, 0), 14),
                ("TOPPADDING", (0, 0), (0, 0), 26),
                ("LEFTPADDING", (1, 0), (1, 0), 20),
                ("RIGHTPADDING", (1, 0), (1, 0), 20),
                ("TOPPADDING", (1, 0), (1, 0), 26),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )

    doc.build([table])


if __name__ == "__main__":
    import os

    os.makedirs("/home/claude/mohammed-portfolio/public/resume", exist_ok=True)
    build_pdf("/home/claude/mohammed-portfolio/public/resume/Mohammed-Ahmed-CV.pdf")
    print("Resume PDF generated.")
