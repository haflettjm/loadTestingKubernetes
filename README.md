  /*
  *   So we need to spin a pod to kubernetes and iterate through the pod spins until we reach the desired amount...
  *   Does that mean we spin a pod here in this function. Wait for that to finish grab the time it took then pull the next batch.
  *   Once that finishes we can then set the times in an array Find the mean time to complete pod finishes with minimums and maximums.
  *   After finishing we spin back to the default deployment confirm it has returned to the original state then exit the test while spitting out the test results to a csv file and displaying a table with the testing information.
  *   
  */