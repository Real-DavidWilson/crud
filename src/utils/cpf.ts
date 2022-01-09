const cpfReg = new RegExp(
    "([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})"
);

function isValidCPF(_cpf: string) {
    if (!cpfReg.test(_cpf)) return false;

    const [, digit] = _cpf.split("-");

    const d1 =
        (_cpf
            .split("-")[0]
            .split("")
            .filter((n) => !isNaN(parseInt(n)))
            .map((n, i) => parseInt(n))
            .map((n, i) => n * (10 - i))
            .reduce((p, c) => p + c) *
            10) %
        11;

    const d2 =
        (_cpf
            .split("")
            .filter((_, i, a) => i != a.length - 1)
            .filter((n) => !isNaN(parseInt(n)))
            .map((n, i) => parseInt(n))
            .map((n, i) => n * (11 - i))
            .reduce((p, c) => p + c) *
            10) %
        11;

    return `${d1}${d2}` === digit;
}

export { isValidCPF };
