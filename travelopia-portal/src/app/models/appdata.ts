
export const title = {
    salutations: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Mx']
}
export const regex = {
    email: '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\\.)+([a-zA-Z0-9]{2,4})',
    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    mobile: /(\d{5})(\d{3})(\d{2})/,
    name: '^[a-zA-Z]{3,}(?: [a-zA-Z]+){1,}$',
    numberRegex: '^[0-9.]*$',
    nowhitespace: '[a-zA-Z0-9_]+(.|\n)*$',
    onedecimal: /^[-]?\d*(\.\d{1,1})?$/
}
export const dateFormats = {YYYYMMDD: "YYYY-MM-DD"}