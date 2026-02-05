/**
 * Disk Scheduling Algorithms Service
 * Core algorithm logic preserved from original implementation
 */

function isValidInputNumbers(requestSequence, head) {
  for (let i = 0; i < requestSequence.length; ++i) {
    if (requestSequence[i] > 199 || requestSequence[i] < 0) {
      return false;
    }
  }
  if (head > 199 || head < 0) {
    return false;
  }
  return true;
}

// Time Complexity: O(n)
function fcfs(requestSequence, head) {
  const requestFinalOrder = [head];
  for (let i = 0; i < requestSequence.length; ++i) {
    requestFinalOrder.push(requestSequence[i]);
  }

  let totalSeekCount = Math.abs(requestSequence[0] - head);
  for (let i = 1; i < requestSequence.length; ++i) {
    totalSeekCount += Math.abs(requestSequence[i] - requestSequence[i - 1]);
  }

  return {
    totalSeekCount,
    finalOrder: requestFinalOrder,
    averageSeekCount: (totalSeekCount / requestSequence.length).toFixed(2),
  };
}

module.exports = {
  isValidInputNumbers,
  fcfs,
};
