const createKpi = (
    variable: string,
    targetData: Array<number>,
    targetThreshold: string,
    continueData:  KpisChartData,
    display: boolean = true,
    timeFrame: number = 3,
  ): KpiProps => ({
    variable,
    targetData,
    targetThreshold,
    continueData,
    timeFrame,
    display,
  });
  