import XCTest
import SwiftTreeSitter
import TreeSitterSammine

final class TreeSitterSammineTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_sammine())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Sammine grammar")
    }
}
