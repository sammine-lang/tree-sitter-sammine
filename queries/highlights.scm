; queries/highlights.scm

; highlight the “fn” keyword
(function_item "fn" @keyword)
(if_statement "if" @keyword.control)
(if_statement "else" @keyword.control)
(return_statement "return" @keyword.control)
(variable_declaration "let" @keyword.declaration)


; highlight the function’s name
(function_item
  name: (identifier) @function.name)

(parameter
  type: (primitive_type) @type)
(parameter
  type: (identifier) @type)

(function_item
  return_type: (primitive_type) @type)

(comment)   @comment
