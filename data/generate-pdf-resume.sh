pandoc resume.mdx -o output.pdf --pdf-engine=xelatex \
  -V geometry:top=1in \
  -V geometry:bottom=1in \
  -V geometry:left=1in \
  -V geometry:right=1in \
  -V mainfont="Arial" \
  -V colorlinks \
  -V fontsize=12pt \
  -V linestretch=1

