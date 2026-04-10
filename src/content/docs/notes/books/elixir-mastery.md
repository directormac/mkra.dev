---
title: Elixir Mastery
---

## Chapter 1: Introduction to Elixir

This chapter introduces **Elixir**, a dynamic, functional language built on the **Erlang Virtual Machine (BEAM)**. It is designed for building scalable, maintainable, and fault-tolerant applications.

### Key Concepts

- **Functional Programming:** Emphasizes immutability, pure functions, and higher-order functions for clearer, more testable code.
- **The BEAM:** The core of Elixir's power, providing a foundation for handling thousands of concurrent processes with high reliability.
- **Concurrency & Parallelism:** Uses lightweight processes and message-passing to build highly responsive systems.
- **Fault-Tolerance:** Inherits Erlang's "let it crash" philosophy, allowing systems to recover gracefully from failures.
- **Expressive Syntax:** Clean and readable, heavily influenced by Ruby.

### Setting Up the Environment

To develop with Elixir, you need two main components:
1.  **Erlang/OTP:** The underlying platform and virtual machine.
2.  **Elixir:** The language itself.

#### Installation Quick Start
- **macOS:** `brew install erlang elixir`
- **Ubuntu/Debian:** `sudo apt install erlang elixir`
- **Windows:** Use the official Elixir installer.

#### Verification
Check your installation with:
```bash
erl -version
elixir -version
```

### Additional Tools
- **Mix:** Elixir's build tool for managing dependencies and project tasks.
- **IDEs:** Popular choices include VS Code, Sublime Text, and Zed.
- **Version Control:** Git is recommended for managing projects.

## Chapter 2: Elixir Basics

This chapter covers the fundamental building blocks of Elixir, including syntax, data structures, and core programming constructs.

### Data Structures

- **Atoms:** Immutable constants starting with a colon.
  ```elixir
  :ok
  :error
  :apple
  ```
- **Tuples:** Ordered collections enclosed in `{}`.
  ```elixir
  {1, "two", 3.0}
  {:ok, "Success!"}
  ```
- **Lists:** Linked lists enclosed in `[]`. Use `[head | tail]` for pattern matching.
  ```elixir
  [1, 2, 3, "four"]
  [head | tail] = [1, 2, 3] # head = 1, tail = [2, 3]
  ```
- **Maps:** Key-value pairs enclosed in `%{}`.
  ```elixir
  user = %{name: "Alice", age: 30}
  user.name # "Alice"
  ```
- **Keyword Lists:** Often used for function options.
  ```elixir
  [name: "Bob", age: 25] # Same as [{:name, "Bob"}, {:age, 25}]
  ```

### Variables & Pattern Matching

The `=` operator is the **match operator**.

```elixir
# Basic match
x = 10

# Tuple matching
{first, last} = {:john, :doe} # first = :john, last = :doe

# List matching (head/tail)
[h | t] = [1, 2, 3] # h = 1, t = [2, 3]
```

### Functions & Modules

Modules group functions together. Functions support multiple clauses and guards.

```elixir
defmodule Math do
  # Standard function
  def add(x, y) do
    x + y
  end

  # Multiple clauses with pattern matching
  def factorial(0), do: 1
  def factorial(n) when n > 0, do: n * factorial(n - 1)
end

# Calling a function
Math.add(1, 2) # 3
```

**Anonymous Functions:**
```elixir
adder = fn(x, y) -> x + y end
adder.(5, 5) # 10 (Note the dot)
```

### Control Flow

While recursion is preferred, Elixir provides traditional control structures.

```elixir
# Case
case grade do
  90..100 -> "Excellent"
  80..89 -> "Good"
  _ -> "Needs improvement"
end

# Cond (checks conditions)
cond do
  x > y -> "x is bigger"
  x < y -> "y is bigger"
  true -> "equal"
end

# For comprehension
squares = for n <- 1..5, do: n * n # [1, 4, 9, 16, 25]
```

### Input/Output (I/O)

```elixir
# Console Output
IO.puts("Hello, world!")

# User Input
name = IO.gets("What is your name? ") |> String.trim()

# File Reading/Writing
File.write!("test.txt", "Some content")
content = File.read!("test.txt")
```
