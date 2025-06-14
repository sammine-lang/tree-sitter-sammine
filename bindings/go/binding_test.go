package tree_sitter_sammine_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_sammine "github.com/tree-sitter/tree-sitter-sammine/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_sammine.Language())
	if language == nil {
		t.Errorf("Error loading Sammine grammar")
	}
}
