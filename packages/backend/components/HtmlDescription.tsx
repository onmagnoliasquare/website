/**
 * HtmlDescription enables schema descriptions to have valid HTML
 * elements like anchor elements. The caveat is that in order to
 * use this component, the `schemaType` file it is used in must
 * be a `.tsx` file (or `.jsx`, but since we are using typescript,
 * it must be a `.tsx` file).
 * @param param0
 * @returns
 */
export const HtmlDescription = ({children}: {children: React.ReactNode}) => {
  return children || ''
}
