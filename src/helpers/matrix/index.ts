export const clearMatrixId = (matrixId: string): string => {
  return matrixId.split('.').join('+');
};

/**
 * Restoring matrixId
 * @param cMatrixId clear matrix id
 * @return matrix id
 */

export const restoreMatrixId = (cMatrixId: string): string => {
  return cMatrixId.split('+').join('.');
};
