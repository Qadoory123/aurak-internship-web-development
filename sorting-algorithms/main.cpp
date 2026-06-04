#include <iostream>
#include <fstream>
#include <ctime>
#include <string>
#include <iomanip>

using namespace std;

// This is the size of the arrays we are testing (100,000)
const int SIZE = 100000;
int DataArray[SIZE]; // This stores the original data from the file
int TempArray[SIZE]; // We copy data here so we don't ruin the original file data

// These arrays hold our timing results and the names of the algorithms
double finalAverages[10][3]; 
string algoNames[10] = {
    "Bubble Sort V1", "Bubble Sort V2",
    "Selection Sort V1", "Selection Sort V2",
    "Insertion Sort V1", "Insertion Sort V2",
    "Merge Sort V1", "Merge Sort V2",
    "Quick Sort V1", "Quick Sort V2"
};

// Just a basic helper function to swap two numbers
void swapValues(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}

// The basic bubble sort we learned. It just keeps looping no matter what.
void bubbleSortV1(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Improved Bubble Sort. I added a "swapped" flag to see if we actually did anything.
// If we go through a whole pass without a swap, the array is already sorted, so we break.
void bubbleSortV2(int arr[], int n) {
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

// Normal Selection Sort. It looks for the smallest number and swaps it to the front.
void selectionSortV1(int Data[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (Data[j] < Data[minIndex]) minIndex = j;
        }
        if (minIndex != i) swapValues(Data[i], Data[minIndex]);
    }
}

// Bidirectional Selection Sort. Basically, I find the min AND the max at the same time.
// I put the min at the start and the max at the end, which cuts the work in half.
void selectionSortV2(int Data[], int n) {
   for (int left = 0, right = n - 1; left < right; left++, right--) {
        int minIndex = left, maxIndex = left;
        for (int i = left; i <= right; i++) {
            if (Data[i] < Data[minIndex]) minIndex = i;
            if (Data[i] > Data[maxIndex]) maxIndex = i;
        }
        
        if (minIndex != left) {
            swapValues(Data[left], Data[minIndex]);
        }
        
        // This part is tricky—if the max was at the 'left' spot, it moved when we swapped the min.
        // So we have to update maxIndex before the final swap.
        if (maxIndex == left) {
            maxIndex = minIndex;
        }
        
        if (maxIndex != right) {
            swapValues(Data[right], maxIndex);
    }
}
}

// Standard Insertion Sort. It takes one item and shifts others until it finds the right spot.
void insertionSortV1(int data[], int n) {
    int item, insertIndex;
    for (int pass = 1; pass < n; pass++) {
        item = data[pass];
        insertIndex = pass;
        while (insertIndex > 0 && data[insertIndex - 1] > item) {
            data[insertIndex] = data[insertIndex - 1];
            insertIndex--;
        }
        data[insertIndex] = item;
    }
}

// This helper uses binary search to find the insert position faster than looking one by one.
int binarySearchInsertionIndex(int data[], int item, int low, int high) {
    int mid;
    while (low <= high) {
        mid = (low + high) / 2;
        if (data[mid] > item) high = mid - 1;
        else low = mid + 1;
    }
    return low;
}

// Improved Insertion Sort. I used the binary search helper to find the spot.
// It also skips the whole process if the number is already in the right order compared to the previous one.
void insertionSortV2(int data[], int n) {
    int item, insertIndex;
    for (int pass = 1; pass < n; pass++) {
        item = data[pass];
        if (data[pass] >= data[pass - 1]) continue;
        insertIndex = binarySearchInsertionIndex(data, item, 0, pass - 1);
        for (int j = pass; j > insertIndex; j--) data[j] = data[j - 1];
        data[insertIndex] = item;
    }
}

// This is the merge step that combines two sorted parts into one.
void mergeData(int data[], int left, int mid, int right) {
    int size1 = mid - left + 1;
    int size2 = right - mid;
    int* leftArr = new int[size1];
    int* rightArr = new int[size2];
    for (int i = 0; i < size1; i++) leftArr[i] = data[left + i];
    for (int j = 0; j < size2; j++) rightArr[j] = data[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < size1 && j < size2) {
        if (leftArr[i] <= rightArr[j]) data[k++] = leftArr[i++];
        else data[k++] = rightArr[j++];
    }
    while (i < size1) data[k++] = leftArr[i++];
    while (j < size2) data[k++] = rightArr[j++];
    delete[] leftArr;
    delete[] rightArr;
}

// Normal Merge Sort using recursion to split and merge.
void mergeSortV1(int data[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSortV1(data, left, mid);
        mergeSortV1(data, mid + 1, right);
        mergeData(data, left, mid, right);
    }
}

// Improved Merge Sort. I added a simple check: if the last item of the left part 
// is already smaller than the first item of the right part, we don't need to merge.
void mergeSortV2(int data[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSortV2(data, left, mid);
        mergeSortV2(data, mid + 1, right);
        if (data[mid] <= data[mid + 1]) return;
        mergeData(data, left, mid, right);
    }
}

// Regular Partition. It just uses the first element as the pivot. 
// This is what makes it slow on sorted arrays.
int partitionV1(int arr[], int low, int high) {
    int pivot = arr[low];
    int i = low + 1;
    for (int j = low + 1; j <= high; j++) {
        if (arr[j] < pivot) {
            swapValues(arr[i], arr[j]);
            i++;
        }
    }
    swapValues(arr[low], arr[i - 1]);
    return i - 1;
}

// Standard Quick Sort using the partition method above.
void quickSortV1(int arr[], int low, int high) {
    while (low < high) {
        int p = partitionV1(arr, low, high);
        if (p - low < high - p) {
            quickSortV1(arr, low, p - 1);
            low = p + 1;
        } else {
            quickSortV1(arr, p + 1, high);
            high = p - 1;
        }
    }
}

// This helper picks the pivot by looking at the start, middle, and end.
// It finds a "middle-ground" value so the sorting stays balanced.
int medianOfThree(int arr[], int low, int high) {
    int mid = (low + high) / 2;
    if (arr[low] > arr[mid]) swapValues(arr[low], arr[mid]);
    if (arr[low] > arr[high]) swapValues(arr[low], arr[high]);
    if (arr[mid] > arr[high]) swapValues(arr[mid], arr[high]);
    return mid;
}

// Improved Partition. Uses Median of Three to pick a better pivot so we don't hit the O(n^2) worst case.
int partitionV2(int arr[], int low, int high) {
    int pivotIndex = medianOfThree(arr, low, high);
    swapValues(arr[pivotIndex], arr[high]);
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swapValues(arr[i], arr[j]);
        }
    }
    swapValues(arr[i + 1], arr[high]);
    return i + 1;
}

// Improved Quick Sort using the smarter partitioning.
void quickSortV2(int arr[], int low, int high) {
    if (low < high) {
        int p = partitionV2(arr, low, high);
        quickSortV2(arr, low, p - 1);
        quickSortV2(arr, p + 1, high);
    }
}

// Reads the numbers from the text files provided in the lab.
bool loadArray(string filename) {
    cout << "Reading (" << filename << ")... ";
    ifstream file(filename);
    if (!file) {
        cout << "ERROR!" << endl;
        return false;
    }
    for (int i = 0; i < SIZE; i++) file >> DataArray[i];
    file.close();
    cout << "Success!" << endl;
    return true;
}

// Copies the data from our original array into a temporary one for sorting.
void copyToTemp() {
    for (int i = 0; i < SIZE; i++) TempArray[i] = DataArray[i];
}

/* We had a print function here for testing, but I commented it out 
   like the project instructions said.
*/

int main() {
    // Names of the files we were given to test
    string files[3] = {"randomList.txt", "Sorted.txt", "SortedBackwards.txt"};
    string scenarioNames[3] = {"Random Case", "Sorted Case", "Reverse Case"};

    cout << fixed << setprecision(5);

    // Loop through each of the 10 versions of the algorithms
    for (int algo = 0; algo < 10; algo++) {
        cout << "\n----------------------------------------------------" << endl;
        cout << "ALGORITHM: " << algoNames[algo] << endl;
        cout << "----------------------------------------------------" << endl;

        // Test each algorithm against the 3 file scenarios
        for (int scenario = 0; scenario < 3; scenario++) {
            if (!loadArray(files[scenario])) continue;

            double currentTotal = 0;
            // Run each test 3 times so we can take the average (as required)
            for (int run = 1; run <= 3; run++) {
                copyToTemp();
                clock_t start = clock(); // Start the timer

                // This huge if-else block picks which algorithm to run
                if (algo == 0) bubbleSortV1(TempArray, SIZE);
                else if (algo == 1) bubbleSortV2(TempArray, SIZE);
                else if (algo == 2) selectionSortV1(TempArray, SIZE);
                else if (algo == 3) selectionSortV2(TempArray, SIZE);
                else if (algo == 4) insertionSortV1(TempArray, SIZE);
                else if (algo == 5) insertionSortV2(TempArray, SIZE);
                else if (algo == 6) mergeSortV1(TempArray, 0, SIZE - 1);
                else if (algo == 7) mergeSortV2(TempArray, 0, SIZE - 1);
                else if (algo == 8) quickSortV1(TempArray, 0, SIZE - 1);
                else if (algo == 9) quickSortV2(TempArray, 0, SIZE - 1);

                clock_t end = clock(); // Stop the timer
                currentTotal += (double)(end - start) / CLOCKS_PER_SEC;
            }
            
            // Store and print the average for this scenario
            finalAverages[algo][scenario] = currentTotal / 3.0;
            cout << " - " << scenarioNames[scenario] << " Average: " << finalAverages[algo][scenario] << " s" << endl;
        }
    }

    // This prints the final table that we need for the report analysis
    cout << "\n\n==========================================================================" << endl;
    cout << "                         FINAL PERFORMANCE SUMMARY                        " << endl;
    cout << "==========================================================================" << endl;
    cout << left << setw(20) << "Algorithm" << " | " 
         << setw(15) << "Random (avg)" << " | " 
         << setw(15) << "Sorted (avg)" << " | " 
         << setw(15) << "Reverse (avg)" << endl;
    cout << "--------------------------------------------------------------------------" << endl;
    
    for (int algo = 0; algo < 10; algo++) {
        cout << left << setw(20) << algoNames[algo] << " | " 
             << setw(15) << finalAverages[algo][0] << " | " 
             << setw(15) << finalAverages[algo][1] << " | " 
             << setw(15) << finalAverages[algo][2] << " s" << endl;
    }
    cout << "==========================================================================" << endl;

    return 0;
}
