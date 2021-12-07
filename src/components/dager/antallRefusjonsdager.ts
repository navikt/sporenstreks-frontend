export default function antallRefusjonsdager(refusjonsdato: Date): number {
  if (refusjonsdato < new Date(2021, 10, 30)) {
    return 13;
  }
  return 11;
}