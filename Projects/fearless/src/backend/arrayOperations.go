package main

// deleteFromArray delete an element of a certain index from the array
func deleteFromArray(target []userSession, index int) []userSession {
	copy(target[index:], target[(index+1):])
	return target[:len(target)-1]
}
