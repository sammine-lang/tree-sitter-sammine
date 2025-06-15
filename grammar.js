/**
 * @file Parser for the educational front end sammine-lang
 * @author badumbatish <thisisjjasmine@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'sammine',

  extras: $ => [
    /\s+/,        // whitespace
    $.comment      // line comments
  ],

  rules: {
    // A source file is a repetition of top-level definitions
    source_file: $ => repeat($._definition),

    // Top-level definitions: functions (add more as needed)
    _definition: $ => choice(
      $.function_item
      // TODO: add record definitions when implemented
    ),

    // == Function definitions ==
    function_item: $ => seq(
      'fn',
      field('name', $.identifier),
      '(',
        optional(seq($.parameter, repeat(seq(',', $.parameter)))),
      ')',
      // Optional return type
      optional(seq(
        '->',
        field('return_type', $._type)
      )),
      field('body', $.block)
    ),

    parameter: $ => seq(
      field('name', $.identifier),
      ':',
      field('type', $._type)
    ),

    // Types: primitive for now, extendable later
    _type: $ => choice(
      $.primitive_type,
      $.identifier
      // TODO: add record_type
    ),

    primitive_type: $ => choice(
      'i64',
      'f64',
      'bool',
      'str'
    ),

    // == Blocks and statements ==
    block: $ => seq(
      '{',
      repeat($.statement),
      '}'
    ),

    statement: $ => choice(
      // $.if_statement,
      $.variable_declaration,
      $.if_statement,
      $.expression_statement,
      $.return_statement,
      ';'         // standalone semicolon
    ),

    if_statement: $ => seq(
      'if',
      $.expression,
      $.block,
      optional(seq('else', field('else', $.block)))
    ),

    return_statement: $ => seq(
      'return',
      $.expression,
      ';'
    ),

    variable_declaration: $ => seq(
      'let',
      field('name', $.identifier),
      '=',
      field('value', $.expression),
      ';'
    ),

    assignment_expression: $ => prec.right(1, seq(
      field('left', $.identifier),
      '=',
      field('right', $.expression)
    )),

    expression_statement: $ => seq(
      $.expression,
      ';'
    ),

    // == Expressions ==
    expression: $ => choice(
      $.binary_expression,
      $.call_expression,
      $.identifier,
      $.assignment_expression,
      $.number
    ),

    binary_expression: $ => prec.left(2, seq(
      $.expression,
      choice('==', '||', '+', '-'),
      $.expression
    )),

    call_expression: $ => seq(
      $.identifier,
      '(',
      optional($.expression),
      ')'
    ),

    // == Tokens ==
    identifier: $ => /[a-zA-Z_]\w*/, // letters, underscores, digits
    number:     $ => /\d+/,           // integer literals

    // Comments: support both // and # style
    comment: $ => token(choice(
      seq('//', /.*/),
      seq('#',  /.*/)
    ))
  }
});
