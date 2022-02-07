export default function muligMaksimalRefusjon(
  refusjonGrunnbelop: number,
  refusjonDager: number
): number {
  const aarsbelop = refusjonGrunnbelop * 6;
  const dagsbelop = aarsbelop / 260;

  return dagsbelop * refusjonDager;
}
