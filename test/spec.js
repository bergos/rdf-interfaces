/* global describe, it */
var assert = require('assert')
var rdf = require('../')

describe('RDF-Interfaces', function () {
  describe('Node', function () {
    var implementsNodeInterface = function (node) {
      it('should implement the Node interface', function () {
        assert.equal(typeof node.nominalValue, 'string')
        assert.equal(typeof node.interfaceName, 'string')
        assert.equal(typeof node.toString, 'function')
        assert.equal(typeof node.valueOf, 'function')
        assert.equal(typeof node.toNT, 'function')
        assert.equal(typeof node.equals, 'function')
      })
    }

    describe('NamedNode', function () {
      implementsNodeInterface(new rdf.NamedNode('http://example.org'))

      it('.nominalValue should contain the IRI', function () {
        var node = new rdf.NamedNode('http://example.org')

        assert.equal(node.nominalValue.toString(), 'http://example.org')
      })

      it('.interfaceName should contain the string "NamedNode"', function () {
        var node = new rdf.NamedNode('http://example.org')

        assert.equal(node.interfaceName, 'NamedNode')
      })

      it('.toString should return the nominalValue', function () {
        var node = new rdf.NamedNode('http://example.org')

        assert.equal(node.toString(), 'http://example.org')
      })

      it('.valueOf should return the nominalValue', function () {
        var node = new rdf.NamedNode('http://example.org')

        assert.equal(node.valueOf(), node.nominalValue.toString())
      })

      it('.toNT should return the N-Triple representation', function () {
        var node = new rdf.NamedNode('http://example.org')

        assert.equal(node.toNT(), '<http://example.org>')
      })

      it('.equals should return true if all attributes are equivalent', function () {
        var nodeA = new rdf.NamedNode('http://example.org')
        var nodeB = new rdf.NamedNode('http://example.org')
        var nodeC = new rdf.NamedNode('http://example.com')

        assert(nodeA.equals(nodeB))
        assert(!nodeA.equals(nodeC))
      })

      // TODO: support string compares in rdf.NamedNode.equals
      /* it('.equals should return true if compared against the stringified representation of the NamedNode', function () {
       var node = new rdf.NamedNode('http://example.org')

       assert(node.equals(node.toString()))
       assert(!node.equals('test'))
       }) */

      // TODO: support RegExp compares in rdf.NamedNode.equals
      /* it('.equals should return true if the stringified representation matches a RegExp', function () {
       var node = new rdf.NamedNode('http://example.org')

       assert(node.equals(new RegExp('http.*')))
       assert(!node.equals(new RegExp('ftp.*')))
       }) */
    })

    describe('BlankNode', function () {
      implementsNodeInterface(new rdf.BlankNode())

      it('.nominalValue should be a stringifyable value', function () {
        var node = new rdf.BlankNode()

        assert(node.nominalValue.toString())
      })

      it('.interfaceName should contain the string "BlankNode"', function () {
        var node = new rdf.BlankNode()

        assert.equal(node.interfaceName, 'BlankNode')
      })

      it('.toString should return the nominalValue prepended with "_:"', function () {
        var node = new rdf.BlankNode()

        assert.equal(node.toString(), '_:' + node.nominalValue.toString())
      })

      it('.valueOf should return the native value', function () {
        var node = new rdf.BlankNode()

        assert.equal(node.valueOf(), node.nominalValue.toString())
      })

      it('.toNT should return the N-Triple representation', function () {
        var node = new rdf.BlankNode()

        assert.equal(node.toNT(), '_:' + node.nominalValue.toString())
      })

      it('.equals should return true if all attributes are equivalent', function () {
        var nodeA = new rdf.BlankNode()
        var nodeB = nodeA
        var nodeC = new rdf.BlankNode()

        assert(nodeA.equals(nodeB))
        assert(!nodeA.equals(nodeC))
      })

      // TODO: support string compares in rdf.BlankNode.equals
      /* it('.equals should return true if compared against the same stringified BlankNode', function () {
        var node = new rdf.BlankNode()

        assert(node.equals(node.toString()))
        assert(!node.equals('test'))
      }) */

      // TODO: support RegExp compares in rdf.BlankNode.equals
      /* it('.equals should return true if the stringified version matches a RegExp', function () {
        var node = new rdf.BlankNode()

        assert(node.equals(new RegExp('_:')))
        assert(!node.equals(new RegExp('<')))
      }) */
    })

    describe('Literal', function () {
      implementsNodeInterface(new rdf.Literal('test'))

      it('should implement the Node interface', function () {
        var languageNode = new rdf.Literal('test', 'en')
        var datatypeNode = new rdf.Literal('test', null, rdf.NamedNode('http://exaple.org'))

        assert.equal(typeof languageNode.language, 'string')
        assert.equal(typeof datatypeNode.datatype, 'object')
      })

      it('.nominalValue should be a stringifyable value', function () {
        var node = new rdf.Literal('test')

        assert.equal(node.nominalValue.toString(), 'test')
      })

      it('.interfaceName should contain the string "Literal"', function () {
        var node = new rdf.Literal('test')

        assert.equal(node.interfaceName, 'Literal')
      })

      it('.toString should return the nominalValue', function () {
        var node = new rdf.Literal('test')

        assert.equal(node.toString(), node.nominalValue.toString())
      })

      it('.valueOf should return the native value', function () {
        var node = new rdf.Literal('test', null, null, 'native')

        assert.equal(node.valueOf(), 'native')
      })

      it('.toNT should return the N-Triple representation', function () {
        var node = new rdf.Literal('test')

        assert.equal(node.toNT(), '"test"')
      })

      it('.toNT should return the N-Triple representation including the language', function () {
        var node = new rdf.Literal('test', 'en')

        assert.equal(node.toNT(), '"test"@en')
      })

      it('.toNT should return the N-Triple representation including the datatype', function () {
        var node = new rdf.Literal('test', null, new rdf.NamedNode('http://example.org'))

        assert.equal(node.toNT(), '"test"^^<http://example.org>')
      })

      it('.equals should return true if all attributes are equivalent', function () {
        var nodeA = new rdf.Literal('test')
        var nodeB = new rdf.Literal('test')
        var nodeC = new rdf.Literal('other')
        var nodeD = new rdf.Literal('test', 'en')
        var nodeE = new rdf.Literal('test', null, new rdf.NamedNode('http://example.org'))

        assert(nodeA.equals(nodeB))
        assert(!nodeA.equals(nodeC))
        assert(!nodeA.equals(nodeD))
        assert(!nodeA.equals(nodeE))
      })

      // TODO: support string compares in rdf.Literal.equals
      /* it('.equals String', function () {
        var node = new rdf.Literal('test')

        assert(node.equals('test'))
        assert(!node.equals('example'))
      }) */

      // TODO: support RegExp compares in rdf.Literal.equals
      /* it('.equals RegExp', function () {
        //var node = new rdf.Literal('test')
        var node = rdf.createLiteral('test')

        assert(node.equals(new RegExp('t.*')))
        assert(!node.equals(new RegExp('e.*')))
      }) */
    })
  })

  describe('Triple', function () {
    it('should implement the Triple interface', function () {
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/object'))

      assert.equal(typeof triple.subject, 'object')
      assert.equal(typeof triple.predicate, 'object')
      assert.equal(typeof triple.object, 'object')
      assert.equal(typeof triple.toString, 'function')
      assert.equal(typeof triple.equals, 'function')
    })

    it('.toString should return the N-Triples representation', function () {
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test', 'en'))

      assert.equal(triple.toString(), '<http://example.org/subject> <http://example.org/predicate> "test"@en .')
    })

    it('.equals should return true if the triple is equivalent', function () {
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      var tripleC = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test', 'en'))

      assert(tripleA.equals(tripleB))
      assert(!tripleA.equals(tripleC))
    })
  })

  describe('Graph', function () {
    var spoFilter = function (s, p, o) {
      return function (triple) {
        return (!s || triple.subject.equals(s)) && (!p || triple.predicate.equals(p)) && (!o || triple.object.equals(o))
      }
    }

    it('should implement the Graph interface', function () {
      var graph = new rdf.Graph()

      assert.equal(typeof graph.length, 'number')
      assert.equal(typeof graph.add, 'function')
      assert.equal(typeof graph.remove, 'function')
      assert.equal(typeof graph.removeMatches, 'function')
      assert.equal(typeof graph.toArray, 'function')
      assert.equal(typeof graph.some, 'function')
      assert.equal(typeof graph.every, 'function')
      assert.equal(typeof graph.filter, 'function')
      assert.equal(typeof graph.forEach, 'function')
      assert.equal(typeof graph.match, 'function')
      assert.equal(typeof graph.merge, 'function')
      assert.equal(typeof graph.addAll, 'function')
      assert.equal(typeof graph.actions, 'object')
      assert.equal(typeof graph.addAction, 'function')
    })

    it('.length should contain the number of triples in the graph', function () {
      var graph = new rdf.Graph()
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      assert.equal(graph.length, 0)
      graph.add(triple)
      assert.equal(graph.length, 1)
    })

    it('.add should add triples to the graph', function () {
      var graph = new rdf.Graph()
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      graph.add(triple)
      assert(graph.toArray()[0].equals(triple))
    })

    it('.add should not create duplicates', function () {
      var graph = new rdf.Graph()
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      graph.add(triple)
      graph.add(triple)
      assert.equal(graph.length, 1)
    })

    it('.remove should remove the given triple', function () {
      var graph = new rdf.Graph()
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      graph.add(triple)
      graph.remove(triple)
      assert.equal(graph.length, 0)
    })

    it('.removeMatches should remove triples based on the given match parameters', function () {
      var graph = new rdf.Graph()
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      graph.add(triple)
      graph.removeMatches('http://example.org/subject')
      assert.equal(graph.length, 0)

      graph.add(triple)
      graph.removeMatches(null, 'http://example.org/predicate')
      assert.equal(graph.length, 0)

      graph.add(triple)
      graph.removeMatches(null, null, new rdf.Literal('test')) // TODO: should work without rdf.Literal object
      assert.equal(graph.length, 0)

      graph.add(triple)
      graph.removeMatches('http://example.org/subject', 'http://example.org/predicate', new rdf.Literal('test')) // TODO:
      assert.equal(graph.length, 0)

      graph.add(triple)
      graph.removeMatches('http://example.org/subject', 'http://example.org/predicate', new rdf.Literal('example')) // TODO:
      assert.equal(graph.length, 1)
    })

    it('.toArray should return all triples in an array', function () {
      var graph = new rdf.Graph()
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.Literal('test'))

      graph.add(triple)

      assert(graph.toArray()[0].equals(triple))
    })

    it('.some should return true if some triples pass the filter test', function () {
      var graph = new rdf.Graph()
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectA'))
      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectB'))

      graph.add(tripleA)
      graph.add(tripleB)

      assert(graph.some(spoFilter(null, null, 'http://example.org/objectA')))
      assert(graph.some(spoFilter('http://example.org/subject', null, null)))
      assert(!graph.some(spoFilter(null, null, 'http://example.org/objectC')))
    })

    it('.every should return true if every triple pass the filter test', function () {
      var graph = new rdf.Graph()
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectA'))
      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectB'))

      graph.add(tripleA)
      graph.add(tripleB)

      assert(graph.every(spoFilter('http://example.org/subject', null, null)))
      assert(!graph.every(spoFilter(null, null, 'http://example.org/objectA')))
    })

    it('.filter should return a new graph that contains all triples that pass the filter test', function () {
      var graph = new rdf.Graph()
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectA'))
      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectB'))

      graph.add(tripleA)
      graph.add(tripleB)

      assert.equal(graph.filter(spoFilter('http://example.org/subject', null, null)).length, 2)
      assert.equal(graph.filter(spoFilter(null, null, 'http://example.org/objectA')).length, 1)
      assert.equal(graph.filter(spoFilter(null, null, 'http://example.org/objectC')).length, 0)
    })

    it('.forEach should call the callback function for every triple', function () {
      var graph = new rdf.Graph()
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectA'))
      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectB'))
      var objects = []

      graph.add(tripleA)
      graph.add(tripleB)

      graph.forEach(function (triple) {
        objects.push(triple.object)
      })

      assert.equal(objects.length, 2)
      assert.equal(objects.join(' '), 'http://example.org/objectA http://example.org/objectB')
    })

    it('.match should return a new graph that contains all triples that pass the given match parameters', function () {
      var graph = new rdf.Graph()
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectA'))
      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectB'))

      graph.add(tripleA)
      graph.add(tripleB)

      assert.equal(graph.match('http://example.org/subject', null, null).length, 2)
      assert.equal(graph.match(null, null, 'http://example.org/objectB').length, 1)
      assert.equal(graph.match(null, null, 'http://example.org/objectC').length, 0)
    })

    it('.merge should return a new graph that contains all triples from the graph object and the given graph', function () {
      var graphA = new rdf.Graph()
      var graphB = new rdf.Graph()
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectA'))
      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectB'))

      graphA.add(tripleA)
      graphB.add(tripleB)

      var graphC = graphA.merge(graphB)

      assert.equal(graphA.length, 1)
      assert.equal(graphB.length, 1)
      assert.equal(graphC.length, 2)
    })

    it('.addAll should import all triples from the given graph', function () {
      var graphA = new rdf.Graph()
      var graphB = new rdf.Graph()
      var tripleA = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectA'))
      var tripleB = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/objectB'))

      graphA.add(tripleA)
      graphB.add(tripleB)

      var graphC = graphA.addAll(graphB)

      assert.equal(graphA.length, 2)
      assert.equal(graphB.length, 1)
      assert.equal(graphC.length, 2)
    })

    it('.actions should be a readable array that contains all actions', function () {
      var graph = new rdf.Graph()
      var triple = new rdf.Triple(
        new rdf.NamedNode('http://example.org/subject'),
        new rdf.NamedNode('http://example.org/predicate'),
        new rdf.NamedNode('http://example.org/object'))
      var testCalled = false
      var loopCalled = false
      var action = new rdf.TripleAction(function () {
        testCalled = true
        return true
      }, function () {
        loopCalled = true
      })

      graph.addAction(action)
      graph.add(triple)

      assert(testCalled)
      assert(loopCalled)
    })

    it('.addAction should add an action that is called as filter and loop callback', function () {
      var graph = new rdf.Graph()
      var action = new rdf.TripleAction(function () {
        return true
      }, function () {})

      graph.addAction(action)

      assert(graph.actions.indexOf(action) >= 0)
    })
  })

  describe('TripleAction', function () {
    it('should implement the TripleAction interface', function () {
      var action = new rdf.TripleAction(function () {
        return true
      }, function () {})

      assert.equal(typeof action.test, 'function')
      assert.equal(typeof action.action, 'function')
      assert.equal(typeof action.run, 'function')
    })
  })

  describe('PrefixMap', function () {
    it('should implement the PrefixMap interface', function () {
      var prefixMap = new rdf.PrefixMap()

      assert.equal(typeof prefixMap.resolve, 'function')
      assert.equal(typeof prefixMap.shrink, 'function')
      assert.equal(typeof prefixMap.setDefault, 'function')
      assert.equal(typeof prefixMap.addAll, 'function')
    })
  })

  describe('TermMap', function () {
    it('should implement the TermMap interface', function () {
      var termMap = new rdf.TermMap()

      assert.equal(typeof termMap.resolve, 'function')
      assert.equal(typeof termMap.shrink, 'function')
      assert.equal(typeof termMap.setDefault, 'function')
      assert.equal(typeof termMap.addAll, 'function')
    })
  })

  describe('Profile', function () {
    it('should implement the Profile interface', function () {
      var profile = new rdf.Profile()

      assert.equal(typeof profile.prefixes, 'object')
      assert.equal(typeof profile.terms, 'object')
      assert.equal(typeof profile.resolve, 'function')
      assert.equal(typeof profile.setDefaultVocabulary, 'function')
      assert.equal(typeof profile.setDefaultPrefix, 'function')
      assert.equal(typeof profile.setTerm, 'function')
      assert.equal(typeof profile.setPrefix, 'function')
      assert.equal(typeof profile.importProfile, 'function')
    })
  })

  describe('RDFEnvironment', function () {
    it('should implement the RDFEnvironment interface', function () {
      var rdfEnvironment = new rdf.RDFEnvironment()

      assert.equal(typeof rdfEnvironment.createBlankNode, 'function')
      assert.equal(typeof rdfEnvironment.createNamedNode, 'function')
      assert.equal(typeof rdfEnvironment.createLiteral, 'function')
      assert.equal(typeof rdfEnvironment.createTriple, 'function')
      assert.equal(typeof rdfEnvironment.createGraph, 'function')
      assert.equal(typeof rdfEnvironment.createAction, 'function')
      assert.equal(typeof rdfEnvironment.createProfile, 'function')
      assert.equal(typeof rdfEnvironment.createTermMap, 'function')
      assert.equal(typeof rdfEnvironment.createPrefixMap, 'function')
    })
  })
})
