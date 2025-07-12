export interface PetroleumData {
  State: string;
  Period: string;
  AGO: number;
  PMS: number;
  DPK: number;
  LPG: number;
  Region: string;
}

// Sample of the data - in a real application, you'd load this from your Excel file
export const petroleumData: PetroleumData[] = [
  { State: "Abia", Period: "2024-11-30", AGO: 1205.63, PMS: 1159.38, DPK: 1342.86, LPG: 1300, Region: "South East" },
  { State: "Abuja", Period: "2024-11-30", AGO: 1352.86, PMS: 1084.44, DPK: 1150, LPG: 1291.67, Region: "North Central" },
  { State: "Adamawa", Period: "2024-11-30", AGO: 1205, PMS: 1161.67, DPK: 1399.44, LPG: 1325.56, Region: "North East" },
  { State: "Akwa Ibom", Period: "2024-11-30", AGO: 1189.43, PMS: 1119.38, DPK: 1375, LPG: 1368.57, Region: "South South" },
  { State: "Anambra", Period: "2024-11-30", AGO: 1264.29, PMS: 1141.25, DPK: 1400, LPG: 1500, Region: "South East" },
  { State: "Lagos", Period: "2024-11-30", AGO: 1147.39, PMS: 1060.27, DPK: 1475, LPG: 1216.92, Region: "South West" },
  { State: "Kano", Period: "2024-11-30", AGO: 1277.14, PMS: 1174.88, DPK: 1400, LPG: 1350, Region: "North West" },
  { State: "Rivers", Period: "2024-11-30", AGO: 1341.67, PMS: 1166.25, DPK: 1160, LPG: 1530, Region: "South South" },
  // Recent data
  { State: "Lagos", Period: "2025-01-03", AGO: 1140.58, PMS: 982.29, DPK: 1475, LPG: 1237.5, Region: "South West" },
  { State: "Abuja", Period: "2025-01-03", AGO: 1288.57, PMS: 1052, DPK: 1150, LPG: 1318, Region: "North Central" },
  { State: "Kano", Period: "2025-01-03", AGO: 1171.43, PMS: 1095, DPK: 1275, LPG: 1450, Region: "North West" },
  { State: "Rivers", Period: "2025-01-03", AGO: 1242, PMS: 1114.29, DPK: 1200, LPG: 1550, Region: "South South" },
];

export const getLatestPrices = () => {
  const latestDate = "2025-01-03";
  return petroleumData.filter(item => item.Period === latestDate);
};

export const getPricesByState = (state: string) => {
  return petroleumData.filter(item => item.State === state);
};

export const getPricesByRegion = (region: string) => {
  return petroleumData.filter(item => item.Region === region);
};

export const getStates = () => {
  return [...new Set(petroleumData.map(item => item.State))].sort();
};

export const getRegions = () => {
  return [...new Set(petroleumData.map(item => item.Region))].sort();
};

export const getFuelTypes = () => {
  return ['PMS', 'AGO', 'DPK', 'LPG'];
};

export const calculatePriceChange = (currentPrice: number, previousPrice: number) => {
  const change = currentPrice - previousPrice;
  const percentage = ((change / previousPrice) * 100);
  return {
    change: change,
    percentage: percentage,
    isPositive: change >= 0
  };
};