// src/data/dsaData.js

export const dsaTopics = [
  {
    id: "java-roadmap",
    title: "Java DSA Roadmap",
    difficulty: "Easy",
    progress: 100,
    description: "Your foundational roadmap outlining steps, syntax, Collections, and OOP design patterns for DSA in Java.",
    resources: [
      { name: "Java Fundamentals Tutorial", type: "article", url: "https://www.w3schools.com/java/" },
      { name: "Java Collections Framework Guide", type: "cheat-sheet", url: "https://www.geeksforgeeks.org/collections-in-java/" },
      { name: "OOP Concepts in Java", type: "video", url: "https://www.youtube.com/watch?v=a199KZGMNwk" }
    ],
    problems: [
      { name: "OOP Class Design", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/design-parking-system/", solved: true },
      { name: "Design HashSet", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/design-hashset/", solved: true }
    ],
    notes: [
      { title: "Java Collections Cheat Sheet", type: "pdf", url: "#", description: "Quick summary of ArrayList, LinkedList, HashMap, HashSet, and PriorityQueue complexities." },
      { title: "OOP Core Principles in Java", type: "link", url: "#", description: "Inheritance, Polymorphism, Encapsulation, and Abstraction notes for interviews." }
    ]
  },
  {
    id: "arrays",
    title: "Arrays",
    difficulty: "Easy",
    progress: 80,
    description: "Contiguous memory allocation, element access, sorting, binary searching, and multi-pointer concepts.",
    resources: [
      { name: "Arrays Complete Guide", type: "article", url: "https://www.geeksforgeeks.org/array-data-structure/" },
      { name: "Mastering Array Algorithms", type: "video", url: "https://www.youtube.com/watch?v=A1A8-7kU4d0" }
    ],
    problems: [
      { name: "Two Sum", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", solved: true },
      { name: "Container With Most Water", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/", solved: true },
      { name: "Merge Sorted Array", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/merge-sorted-array/", solved: true },
      { name: "3Sum", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/", solved: false }
    ],
    notes: [
      { title: "Two Pointer Approach Guide", type: "pdf", url: "#", description: "Detailed technique on narrowing search spaces from boundaries." },
      { title: "Prefix Sum & Precomputation", type: "link", url: "#", description: "Solving range query problems in constant time." }
    ]
  },
  {
    id: "strings",
    title: "Strings",
    difficulty: "Easy",
    progress: 75,
    description: "Sequence of characters, immutability in Java, Rabin-Karp, KMP string matching, and sliding window string checks.",
    resources: [
      { name: "Java String Basics & Immutability", type: "article", url: "https://www.geeksforgeeks.org/string-class-in-java/" },
      { name: "KMP Algorithm for Pattern Matching", type: "video", url: "https://www.youtube.com/watch?v=GTJr8OvyEVQ" }
    ],
    problems: [
      { name: "Valid Anagram", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/valid-anagram/", solved: true },
      { name: "Longest Palindromic Substring", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/longest-palindromic-substring/", solved: false },
      { name: "Group Anagrams", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/group-anagrams/", solved: true },
      { name: "Reverse String", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-string/", solved: true }
    ],
    notes: [
      { title: "StringBuilder vs String", type: "pdf", url: "#", description: "Why String immutability leads to memory overhead and how StringBuilder solves it." }
    ]
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    difficulty: "Medium",
    progress: 60,
    description: "Singly, doubly, and circular linked lists. Mastery of nodes manipulation, pointers traversal, and cycle detections.",
    resources: [
      { name: "Linked List Data Structure Basics", type: "article", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
      { name: "Reversing Linked Lists Step-by-Step", type: "video", url: "https://www.youtube.com/watch?v=G0_I-ZF0S38" }
    ],
    problems: [
      { name: "Reverse Linked List", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/reverse-linked-list/", solved: true },
      { name: "Linked List Cycle", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/linked-list-cycle/", solved: true },
      { name: "Merge Two Sorted Lists", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/merge-two-sorted-lists/", solved: true },
      { name: "Remove Nth Node From End", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", solved: false },
      { name: "Reorder List", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/reorder-list/", solved: false }
    ],
    notes: [
      { title: "Floyd's Cycle Finding Algorithm", type: "pdf", url: "#", description: "Mathematical proof of fast & slow pointers intersection inside lists." }
    ]
  },
  {
    id: "stack",
    title: "Stack",
    difficulty: "Medium",
    progress: 50,
    description: "Last-In-First-Out (LIFO) order. Applications in matching parentheses, expression evaluation, and monotonic stacks.",
    resources: [
      { name: "Stack Implementation & Logic", type: "article", url: "https://www.geeksforgeeks.org/stack-data-structure/" },
      { name: "Monotonic Stack Patterns Explained", type: "video", url: "https://www.youtube.com/watch?v=Dq_ObZwTY_g" }
    ],
    problems: [
      { name: "Valid Parentheses", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/", solved: true },
      { name: "Min Stack", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/min-stack/", solved: true },
      { name: "Largest Rectangle in Histogram", platform: "LeetCode", difficulty: "Hard", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", solved: false },
      { name: "Daily Temperatures", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/daily-temperatures/", solved: false }
    ],
    notes: [
      { title: "Monotonic Stack Cheat Sheet", type: "link", url: "#", description: "Finding the next greater/smaller element in O(N) time." }
    ]
  },
  {
    id: "queue",
    title: "Queue",
    difficulty: "Easy",
    progress: 40,
    description: "First-In-First-Out (FIFO) order. Double-ended queues (Deques), priority queues, and sliding window maximum support.",
    resources: [
      { name: "Introduction to Queue and Deque", type: "article", url: "https://www.geeksforgeeks.org/queue-data-structure/" }
    ],
    problems: [
      { name: "Implement Queue using Stacks", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/implement-queue-using-stacks/", solved: true },
      { name: "Design Circular Queue", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/design-circular-queue/", solved: false },
      { name: "Sliding Window Maximum", platform: "LeetCode", difficulty: "Hard", url: "https://leetcode.com/problems/sliding-window-maximum/", solved: false }
    ],
    notes: [
      { title: "De-que & Circular Queues Guide", type: "pdf", url: "#", description: "Ring buffer designs and double-ended queue operation times." }
    ]
  },
  {
    id: "trees",
    title: "Trees",
    difficulty: "Hard",
    progress: 30,
    description: "Hierarchical models. Binary Trees, Binary Search Trees (BST), AVL Trees, Traversals (Pre/In/Post/Level order), and DFS/BFS.",
    resources: [
      { name: "Binary Tree Tutorials", type: "article", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/" },
      { name: "Tree Traversals In-Depth", type: "video", url: "https://www.youtube.com/watch?v=jmy0La5M1RE" }
    ],
    problems: [
      { name: "Invert Binary Tree", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/invert-binary-tree/", solved: true },
      { name: "Maximum Depth of Binary Tree", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", solved: true },
      { name: "Binary Tree Level Order Traversal", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", solved: false },
      { name: "Lowest Common Ancestor of a BST", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", solved: false },
      { name: "Validate Binary Search Tree", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/", solved: false }
    ],
    notes: [
      { title: "BFS vs DFS on Trees", type: "pdf", url: "#", description: "Comparing space complexities based on tree height and width." }
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    difficulty: "Hard",
    progress: 15,
    description: "Non-linear collections of nodes and edges. Representation (Adjacency Matrix/List), BFS, DFS, Dijkstra, Bellman-Ford, Kruskal, and Prim.",
    resources: [
      { name: "Introduction to Graph Algorithms", type: "article", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
      { name: "Dijkstra's Shortest Path Algorithm", type: "video", url: "https://www.youtube.com/watch?v=FqX5fVdG380" }
    ],
    problems: [
      { name: "Number of Islands", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/", solved: true },
      { name: "Clone Graph", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/clone-graph/", solved: false },
      { name: "Course Schedule", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/course-schedule/", solved: false },
      { name: "Network Delay Time", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/network-delay-time/", solved: false }
    ],
    notes: [
      { title: "Shortest Path Algorithm Complexity Comparison", type: "pdf", url: "#", description: "Tabular comparisons of Dijkstra, Bellman-Ford, and Floyd-Warshall runtimes." }
    ]
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    difficulty: "Hard",
    progress: 10,
    description: "Solving overlapping subproblems using memoization (Top-down) or tabulation (Bottom-up). Knapsack, LCS, LIS, and grids.",
    resources: [
      { name: "Dynamic Programming Introduction", type: "article", url: "https://www.geeksforgeeks.org/dynamic-programming/" },
      { name: "Mastering 1D and 2D DP Patterns", type: "video", url: "https://www.youtube.com/watch?v=Hdr64lKQ3e4" }
    ],
    problems: [
      { name: "Climbing Stairs", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/climbing-stairs/", solved: true },
      { name: "Coin Change", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/", solved: false },
      { name: "Longest Common Subsequence", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/", solved: false },
      { name: "House Robber", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber/", solved: false },
      { name: "Longest Increasing Subsequence", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/", solved: false }
    ],
    notes: [
      { title: "Dynamic Programming Patterns", type: "pdf", url: "#", description: "Guide on classifying problems into 0/1 Knapsack, Unbounded Knapsack, LCS, or Fibonnaci formats." }
    ]
  },
  {
    id: "greedy",
    title: "Greedy",
    difficulty: "Medium",
    progress: 35,
    description: "Making the locally optimal choice at each step to find a global optimum. Interval scheduling, fractional knapsack, Huffman coding.",
    resources: [
      { name: "Greedy Algorithms Guide", type: "article", url: "https://www.geeksforgeeks.org/greedy-algorithms/" }
    ],
    problems: [
      { name: "Jump Game", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/jump-game/", solved: true },
      { name: "Gas Station", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/gas-station/", solved: false },
      { name: "Assign Cookies", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/assign-cookies/", solved: true }
    ],
    notes: [
      { title: "Greedy vs DP Optimization", type: "link", url: "#", description: "How to mathematically prove that a greedy strategy yields a correct global solution." }
    ]
  },
  {
    id: "recursion",
    title: "Recursion",
    difficulty: "Easy",
    progress: 90,
    description: "Functions calling themselves. Solving subproblems, call-stack visualization, backtracking frameworks, and combinations/permutations.",
    resources: [
      { name: "Recursion & Backtracking Masterclass", type: "video", url: "https://www.youtube.com/watch?v=FqX5fVdG380" }
    ],
    problems: [
      { name: "Fibonacci Number", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/fibonacci-number/", solved: true },
      { name: "Subsets", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/subsets/", solved: true },
      { name: "Permutations", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/permutations/", solved: true },
      { name: "N-Queens", platform: "LeetCode", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/", solved: false }
    ],
    notes: [
      { title: "Recursion Tree Method", type: "pdf", url: "#", description: "Evaluating recursive time complexities via tree expansions." }
    ]
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    difficulty: "Medium",
    progress: 45,
    description: "Analyzing subsegments of arrays or strings in linear time. Fixed and variable window size strategies.",
    resources: [
      { name: "Sliding Window Techniques Guide", type: "article", url: "https://www.geeksforgeeks.org/window-sliding-technique/" }
    ],
    problems: [
      { name: "Longest Substring Without Repeating Characters", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", solved: true },
      { name: "Minimum Window Substring", platform: "LeetCode", difficulty: "Hard", url: "https://leetcode.com/problems/minimum-window-substring/", solved: false },
      { name: "Maximum Sum Subarray of Size K", platform: "GeeksforGeeks", difficulty: "Easy", url: "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1", solved: true }
    ],
    notes: [
      { title: "Sliding Window Blueprint", type: "pdf", url: "#", description: "Generic code template for variable window sizing in O(N)." }
    ]
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Medium",
    progress: 70,
    description: "Logarithmic lookup in sorted arrays. Searching answers in ranges (binary search on answer), peak finding, boundaries.",
    resources: [
      { name: "Binary Search Explained in Detail", type: "video", url: "https://www.youtube.com/watch?v=jmy0La5M1RE" }
    ],
    problems: [
      { name: "Binary Search", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/", solved: true },
      { name: "Search in Rotated Sorted Array", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", solved: true },
      { name: "Find First and Last Position of Element", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", solved: true },
      { name: "Koko Eating Bananas", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/koko-eating-bananas/", solved: false }
    ],
    notes: [
      { title: "Binary Search on Answer Range", type: "pdf", url: "#", description: "How to set range checks to find monotonic split points." }
    ]
  }
];
