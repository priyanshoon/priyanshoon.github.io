---
title: Nix Cult - Entry
author: Priyanshu Prasad Gupta
pubDatetime: 2025-10-19
featured: true
draft: true
tags:
  - nix
  - os
description: "this is nix cult"
---

Here I will try to cover all about nix that I learn from various place so far.
This is blog is my experience with nix and nixos and what I learn. I want to put
all the things here of whatever I learn. If you find any mistake this blog's
source code is open source, you can edit and make a pull request too.
[Blog Source Code](https://github.com/priyanshoon/www/)

# What is Nix and NixOS
![this is nix](./nix-anime.png)

Nix can be defined as a purely functional package manager, that enables reproducible
and declarative builds and deployments.

Some of the key features of nix package manager are:
- It can run on top of any linux distribution, like debian or arch.
- MacOS is also supported, as well as ARM64 targets for linux and mac.
- Packages are stored independently of the system in /nix/store.
- Packages are addressed by a cryptographic hash of their inputs and build
procedure. Multiple packages of the same name can coexist in the same system,
they refer to different binaries.
```shell
$ find /nix/store -maxdepth 1 | grep "fish-3.7.1\$"
/nix/store/qkjx3hgnpdvyg3m7973dh4hr1jxbqphw-fish-3.7.1
/nix/store/5c27daphi2jn4aj714pf8jvdqn087989-fish-3.7.1
/nix/store/9g2wgp6wgl8z2x3ikqab0x8dlbqj3b63-fish-3.7.1
```
- There is no global library path for packages built with nix. Each package refers
to their inputs explicitly.
```shell
$ ldd /nix/store/dk84c93annbbyrclhy691ajcyydycw35-zsh-5.9/bin/zsh
        linux-vdso.so.1 (0x00007fe751069000)
        libpcre2-8.so.0 => /nix/store/y667mbdld0s8rmb2i493ldyfh3lsgk1y-pcre2-10.44/lib/libpcre2-8.so.0 (0x00007fe750fc1000)
        libdl.so.2 => /nix/store/776irwlgfb65a782cxmyk61pck460fs9-glibc-2.40-66/lib/libdl.so.2 (0x00007fe750fbc000)
        libncursesw.so.6 => /nix/store/6zdgga8jx741p46wmx8xyibwz3x3fps6-ncurses-6.5/lib/libncursesw.so.6 (0x00007fe750f40000)
        librt.so.1 => /nix/store/776irwlgfb65a782cxmyk61pck460fs9-glibc-2.40-66/lib/librt.so.1 (0x00007fe750f3b000)
        libm.so.6 => /nix/store/776irwlgfb65a782cxmyk61pck460fs9-glibc-2.40-66/lib/libm.so.6 (0x00007fe750e53000)
        libc.so.6 => /nix/store/776irwlgfb65a782cxmyk61pck460fs9-glibc-2.40-66/lib/libc.so.6 (0x00007fe750c00000)
        /nix/store/776irwlgfb65a782cxmyk61pck460fs9-glibc-2.40-66/lib/ld-linux-x86-64.so.2 => /nix/store/776irwlgfb65a782cxmyk61pck460fs9-glibc-2.40-66/lib64/ld-linux-x86-64.so.2 (0x00007fe75106b000)
```

## History Time
I won't bore you with this but it should be fun to that this nix thing started
a research project in the Netherland in 2003 by Eelco Dolstra. The thesis he
proposed is this : [The purely functional software deployments model](https://edolstra.github.io/pubs/phd-thesis.pdf).
Since then, NixOS has had bi-yearly releases, repository holding the package defination, nixpksgs, has grown to be
the biggest repository ever.

![this is nix repo chart](https://repology.org/graph/map_repo_size_fresh.svg)

## Key Concepts
- Nix refers to nix the program and nix the language.
- We use nix (the program) to evaluate code written in nix (the language).
- A derivation is a type of value, that can produce an output in the `nix/store`.
- Packages can be 1:1 derivations, but derivations are very cheap to create.
- Knowing the nix langauge is fundamental to understanding how to use the nix command line,
because they operate in nix expressions.

# Nix Language
We can write nix code in a file ending with an extension `.nix`, or use `nix repl` to evaluate expressions
in a "command line"-like experience.

- `nix repl` : to type your expressions in the command-line
- `nix eval` : to type your expressions in a file

I will use second options because it is more convinient and appealing to new users. So open up your
fav text editor and create a file name `hello.nix`

```nix
# hello.nix
"Hello World!"
```

Open your shell and enter the following command

```shell
$ nix eval -f ./hello.nix
"Hello World!"
```

## Types
Nix is a dynamically typed language, which means that you don't write the type of a value.
Instead, it's calculated at runtime. Nix is also a very simple language, and it has very few types.

> One of the objective of nix is a software reproduciblity, so it needs a very simple langauge to use a base.

I like to have mental model of types in nix, where we find the categories:
- Primitive types.
- Compound types: attribute set and list
- Functions

### Primitive Types
#### String
This is the most important type in nix. String behave mostly like in any other programming language. you
have 2 varients of a string:
- `"foo"`, with single double quotes
- `''foo''`, with double single quotes

The difference is that ''foo'' **trims the leading whitespace**. This is useful for multiline strings,
where you will see them used.

```nix
''
export FOO=BAR
''
```

You can also interpolate values with `${}` inside a string :

```nix
''
export FOO=${"A" + "B"}
''
```
String can be concatenated with `+`.

#### Booleans
We have `true` and `false`. You will use them for `if...`.

#### Null
Apart form the booleans, we also have `null`. You may see it in NixOS modules, to signify the lack of some
configurations.

`null` and `false` are different. You can't use `null` in `if...`.

#### Numbers
Mostly used for demonstration purposes, you probably won't see any number in the wild. Nix has `int` and `float`
types, which coerce automagically.

```nix
1 + 2 * 2 / 1.1
#=> 4.63636
```
