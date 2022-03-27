# 1 Headings

  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading


# 2 Horizontal Rules

  Some text above
  ___

  Some text in the middle

  ---

  Some text below

# 3 Emphasis

  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ***This is bold italic text***

  ___This is bold italic text___

  ~~Strikethrough~~

  ` Code in line `

  ==Hightlight text==

# 4 Blockquotes

  > Blockquotes can also be nested...
  > > ...by **_using additional_** greater-than ~~signs~~ right `next` to each other...
  > > > * ...or with ==spaces== between arrows.
  > > > * x 2
  > > > * x 3
  > > > 1. the ordered 1
  > > > 2. the ordered 2
  > > > 3. the ordered 3

# 5 Lists

  ## Unordered

  + Create a list by starting a line with `+`, `-`, or `*`
  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet. This is a very long list item that will surely wrap onto the next line.
      - Nulla volutpat aliquam velit
  + Very easy!
    - yes it is.

  ## Ordered

  1. Lorem ipsum dolor sit amet
     * Unordered in Ordered 0
       * Unordered in Ordered 0 - 1
       - Unordered in Ordered 0 - 2
       + Unordered in Ordered 0 - 3
     * Unordered in Ordered 1
     * Unordered in Ordered 2
  2. Consectetur adipiscing elit. This is a very long list item that will surely wrap onto the next line.
  3. Integer molestie lorem at massa

  Start numbering with offset:

  57. foo
  58. bar

# 6 Code

  Inline \`code\`

  Indented code

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code

  Block code "fences"

  \`\`\`
  Sample text here...
  \`\`\`

  Syntax highlighting

  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`

# 7 Tables

  | Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  Right aligned columns

  | Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

# 8 Links

  [link text](https://www.google.com)

  [link with title](https://www.google.com "title text!")

  Autoconverted link https://www.google.com (enable linkify to see)

# 9 Images

  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

  Like links, Images also have a footnote style syntax

  ![Alt text][id]

  With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

# 10 Typographic Replacements

  Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  "Smartypants, double quotes" and 'single quotes'
