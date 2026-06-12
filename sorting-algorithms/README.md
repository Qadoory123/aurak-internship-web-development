# Sorting Algorithms Performance Analysis (C++)

## Overview
A C++ project that implements and compares multiple sorting algorithms across different input conditions. Built as part of the CSCI 215 Data Structures and Algorithms course at AURAK, this project measures and analyzes execution time for both standard and optimized versions of each algorithm.

## Algorithms Implemented
- Bubble Sort (standard & optimized)
- Selection Sort (standard & improved)
- Insertion Sort (standard & binary optimized)
- Merge Sort (standard & optimized)
- Quick Sort (standard & median-of-three)

## Technologies Used
- C++
- clock() function for performance timing
- File-based input datasets

## How to Run
1. Clone the repository
2. Open the project in any C++ compiler (Visual Studio, g++, etc.)
3. Compile and run the main file
4. The program will read input from the dataset files and output execution times for each algorithm

## Testing Conditions
Each algorithm was tested against three types of input:
- Random data
- Sorted data
- Reverse sorted data

Dataset size: 100,000 integers per test. Each algorithm was run 3 times and the average execution time was recorded.

## Learning Outcomes
- Time complexity analysis (Big-O)
- Algorithm optimization techniques
- Performance benchmarking with large datasets
- Structured testing and repeated measurement for accuracy
