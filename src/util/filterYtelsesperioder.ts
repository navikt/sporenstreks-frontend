import { Ytelsesperiode } from '../store/types/helseSpionTypes';

export const filterYtelsesperioder = (ytelsesperioder: Ytelsesperiode[], fom?: Date, tom?: Date): Ytelsesperiode[] =>
    ytelsesperioder.filter(ytelsesperiode => fom
        ? ytelsesperiode.periode.fom >= fom!
        : ytelsesperiode
    ).filter(ytelsesperiode => tom
        ? ytelsesperiode.periode.tom <= tom!
        : ytelsesperiode
    ) ?? [];
