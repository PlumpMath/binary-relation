Binary-Relation
=========

A small library providing a BinaryRelation class which is an efficient representation of a relation between two sets of objects A and B.
A typical use case can be keeping track of dynamically chaning relation between integer or string ids of some entities,
such as a relation between user ids and and chatroom names.
The implementation does not make many assumptions about the type of A and B (thanks to HashMap ability to use any objects as keys) but
using large objects (or arrays) instead of their ids can impact performance as it slows down computation of unique hash, and wastes storage for (possibly multiple) copies of their contents.
When in doubt do performance tests and read the HashMap source.

The main goal of this library is to provide efficient implementation, that is O(1) time for `add(a,b)`, `remove(a,b)` and `contains(a,b)` and output dependent `getAs(b)`, `getBs(a)`.
The speed of `countAs(b)` and `countBs(a)` greatly depends on `HashMap.count()` speed, which is reduced to `O(1)` in a fork of HashMap https://github.com/qbolec/hashmap.

## Installation

     npm install binary-relation --save

## Usage

    var BinaryRelation = require('binary-relation');
    var likes = new BinaryRelation();
    likes.add('John','Atlas');
    likes.add('John','Encyclopedia');  //it can be one-to-many if you want
    likes.add('Alice','Encyclopedia');  //it can be many-to-many
    likes.add('John','Atlas');  //duplicated add()s are ignored
    likes.contains('John','Atlas')===true;
    likes.countBs('John')===2;  //sets are refered to as A and B, so countBs counts books
    likes.getBs('John');  //returns a permutation of ['Atlas','Encyclopedia']
    likes.countAs('Atlas')===1;  //and As refers to users
    likes.getAs('Atlas');  //returns (a permutation of) ['John']
    likes.remove('John','Atlas');  //single call to remove() is enough, even if there were multiple add()s
    likes.contains('John','Atlas')===false;

## Tests

    npm test

## Contributing

The source code is writen in TypeScript and the JS version is a result of compilation.
Therefore proposed changes should be applied to the *.ts files.
Please, add unit tests for any new or changed functionality.

## Release History

* 0.1.0 Initial release
