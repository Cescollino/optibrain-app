/* Function to calculate the number of days the patient has been in the USIP */

export function numberOfCareDays(inTime: string): number {
    // Parse the input time string into a Date object
    const entryDate = new Date(inTime)
    const currentDate = new Date()
    
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - entryDate.getTime()
    
    // Convert the time difference to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const numberOfCareDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
    
    return numberOfCareDays
}