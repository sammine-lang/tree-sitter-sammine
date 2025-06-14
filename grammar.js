/**
 * @file Parser for the educational front end sammine-lang
 * @author badumbatish <thisisjjasmine@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "sammine",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
