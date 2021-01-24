interface Complex {

  a: string;
  b: {
    c: string;
    d: number[];
  }
}

const obj: Complex = getFromApi();

const {a, b} = obj;


b?.c

