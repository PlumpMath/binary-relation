import * as chai from "chai";
import BinaryRelation = require("../binary-relation");

chai.should();

describe('BinaryRelation',()=>{
  describe('BinaryRelation.contains', () => {
    it('initially reports no link', () => {
      var relation = new BinaryRelation();
      relation.contains().should.equal(false);
      relation.contains('user1', 'book1').should.equal(false);
      relation.contains('user1').should.equal(false);
      relation.contains(undefined,'book1').should.equal(false);
    })
    it('reports a link after add', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.contains().should.equal(true);
      relation.contains('user1', 'book1').should.equal(true);
      relation.contains('user1').should.equal(true);
      relation.contains(undefined,'book1').should.equal(true);
    })
    it('reports no link after removal', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.contains().should.equal(false);
      relation.contains('user1', 'book1').should.equal(false);
      relation.contains('user1').should.equal(false);
      relation.contains(undefined,'book1').should.equal(false);
    })
    it('reports several added elements',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book2');
      relation.add('user1', 'book3');
      relation.add('user1', 'book1');
      relation.add('user2', 'book1');
      relation.add('user3', 'book1');
      relation.add('user4', 'book4');
      relation.contains().should.equal(true);
      relation.contains(undefined,'book1').should.equal(true);
      relation.contains(undefined,'book2').should.equal(true);
      relation.contains(undefined,'book3').should.equal(true);
      relation.contains(undefined,'book4').should.equal(true);
      relation.contains(undefined,'book5').should.equal(false);
      relation.contains('user1').should.equal(true);
      relation.contains('user2').should.equal(true);
      relation.contains('user3').should.equal(true);
      relation.contains('user4').should.equal(true);
      relation.contains('user5').should.equal(false);
      relation.contains('user1', 'book1').should.equal(true);
      relation.contains('user1', 'book2').should.equal(true);
      relation.contains('user1', 'book3').should.equal(true);
      relation.contains('user2', 'book1').should.equal(true);
      relation.contains('user3', 'book1').should.equal(true);
      relation.contains('user4', 'book4').should.equal(true);
    })
  });
  describe('BinaryRelation.get', () => {
    it('initially reports no link', () => {
      var relation = new BinaryRelation();
      relation.get().should.deep.equal([]);
      relation.get('user1').should.deep.equal([]);
      relation.get(undefined,'book1').should.deep.equal([]);
      relation.get('user1','book1').should.deep.equal([]);
    })
    it('reports a link after add', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.get().should.deep.equal([{a_id:"user1",b_id:"book1"}]);
      relation.get('user1').should.deep.equal([{a_id:"user1",b_id:"book1"}]);
      relation.get(undefined,'book1').should.deep.equal([{a_id:"user1",b_id:"book1"}]);
      relation.get('user1','book1').should.deep.equal([{a_id:"user1",b_id:"book1"}]);
    })
    it('reports no link after removal', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.get().should.deep.equal([]);
      relation.get('user1').should.deep.equal([]);
      relation.get(undefined,'book1').should.deep.equal([]);
      relation.get('user1','book1').should.deep.equal([]);
    })
    it('reports several added elements',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book2');
      relation.add('user1', 'book3');
      relation.add('user1', 'book1');
      relation.add('user2', 'book1');
      relation.add('user3', 'book1');
      relation.add('user4', 'book4');
      relation.get().should.deep.equal([
        {a_id:'user1', b_id:'book1'},
        {a_id:'user1', b_id:'book2'},
        {a_id:'user1', b_id:'book3'},
        {a_id:'user2', b_id:'book1'},
        {a_id:'user3', b_id:'book1'},
        {a_id:'user4', b_id:'book4'},
      ]);
      relation.get(undefined,'book1').should.deep.equal([
        {a_id:'user1', b_id:'book1'},
        {a_id:'user2', b_id:'book1'},
        {a_id:'user3', b_id:'book1'},
      ]);
      relation.get(undefined,'book2').should.deep.equal([
        {a_id:'user1', b_id:'book2'},
      ]);
      relation.get(undefined,'book3').should.deep.equal([
        {a_id:'user1', b_id:'book3'},
      ]);
      relation.get(undefined,'book4').should.deep.equal([
        {a_id:'user4', b_id:'book4'},
      ]);
      relation.get(undefined,'book5').should.deep.equal([
      ]);
      relation.get('user1').should.deep.equal([
        {a_id:'user1', b_id:'book1'},
        {a_id:'user1', b_id:'book2'},
        {a_id:'user1', b_id:'book3'},
      ]);
      relation.get('user2').should.deep.equal([
        {a_id:'user2', b_id:'book1'},
      ]);
      relation.get('user3').should.deep.equal([
        {a_id:'user3', b_id:'book1'},
      ]);
      relation.get('user4').should.deep.equal([
        {a_id:'user4', b_id:'book4'},
      ]);
      relation.get('user5').should.deep.equal([]);
      relation.get('user1', 'book1').should.deep.equal([
        {a_id:'user1', b_id:'book1'},
      ]);
      relation.get('user1', 'book2').should.deep.equal([{a_id:'user1', b_id:'book2'}]);
      relation.get('user1', 'book3').should.deep.equal([{a_id:'user1', b_id:'book3'}]);
      relation.get('user1', 'book1').should.deep.equal([{a_id:'user1', b_id:'book1'}]);
      relation.get('user2', 'book1').should.deep.equal([{a_id:'user2', b_id:'book1'}]);
      relation.get('user3', 'book1').should.deep.equal([{a_id:'user3', b_id:'book1'}]);
      relation.get('user4', 'book4').should.deep.equal([{a_id:'user4', b_id:'book4'}]);
    })
  });
  describe('BinaryRelation.count', () => {
    it('initially reports no link', () => {
      var relation = new BinaryRelation();
      relation.count().should.equal(0);
      relation.count('user1').should.equal(0);
      relation.count(undefined,'book1').should.equal(0);
      relation.count('user1','book1').should.equal(0);

    })
    it('reports a link after add', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.count().should.equal(1);
      relation.count('user1').should.equal(1);
      relation.count(undefined,'book1').should.equal(1);
      relation.count('user1','book1').should.equal(1);
    })
    it('reports no link after removal', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.count().should.equal(0);
      relation.count('user1').should.equal(0);
      relation.count(undefined,'book1').should.equal(0);
      relation.count('user1','book1').should.equal(0);
    })
    it('reports several added elements',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book2');
      relation.add('user1', 'book3');
      relation.add('user1', 'book1');
      relation.add('user2', 'book1');
      relation.add('user3', 'book1');
      relation.add('user4', 'book4');
      relation.count().should.equal(6);
      relation.count(undefined,'book1').should.equal(3);
      relation.count(undefined,'book2').should.equal(1);
      relation.count(undefined,'book3').should.equal(1);
      relation.count(undefined,'book4').should.equal(1);
      relation.count(undefined,'book5').should.equal(0);
      relation.count('user1').should.equal(3);
      relation.count('user2').should.equal(1);
      relation.count('user3').should.equal(1);
      relation.count('user4').should.equal(1);
      relation.count('user5').should.equal(0);
      relation.count('user1', 'book1').should.equal(1);
      relation.count('user1', 'book2').should.equal(1);
      relation.count('user1', 'book3').should.equal(1);
      relation.count('user1', 'book1').should.equal(1);
      relation.count('user2', 'book1').should.equal(1);
      relation.count('user3', 'book1').should.equal(1);
      relation.count('user4', 'book4').should.equal(1);
    })
  });
  describe('BinaryRelation.add',()=>{
    it('reports a link after add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1').should.equal(1);
    })
    it('handles repetition well',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1').should.equal(1);
      relation.add('user1', 'book1').should.equal(0);
      relation.contains('user1', 'book1').should.equal(true);
      relation.remove('user1', 'book1').should.equal(1);
      relation.contains('user1', 'book1').should.equal(false);
    })
  })
  describe('BinaryRelation.remove',()=>{
    it('reports no link after removal',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1').should.equal(1);
      relation.contains('user1', 'book1').should.equal(true);
      relation.remove('user1', 'book1').should.equal(1);
      relation.contains('user1', 'book1').should.equal(false);
    })
    it('handles repetition well',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1').should.equal(1);
      relation.contains('user1', 'book1').should.equal(true);
      relation.remove('user1', 'book1').should.equal(1);
      relation.contains('user1', 'book1').should.equal(false);
      relation.remove('user1', 'book1').should.equal(0);
      relation.contains('user1', 'book1').should.equal(false);
    })
  })
  describe('BinaryRelation.getAs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.getAs('user1').should.deep.equal([]);
      relation.getAs().should.deep.equal([]);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.getAs('book1').should.deep.equal(['user1']);
      relation.getAs().should.deep.equal(['user1']);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.getAs('book1').should.deep.equal(['user1']);
      relation.getAs().should.deep.equal(['user1']);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.getAs('book1').should.deep.equal([]);
      relation.getAs().should.deep.equal([]);
    })
    it('reports several added elements',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book2');
      relation.add('user1', 'book3');
      relation.add('user1', 'book1');
      relation.add('user2', 'book1');
      relation.add('user3', 'book1');
      relation.add('user4', 'book4');
      relation.getAs('book1').should.have.members(['user1','user2','user3']);
      relation.getAs('book2').should.have.members(['user1']);
      relation.getAs('book3').should.have.members(['user1']);
      relation.getAs('book4').should.have.members(['user4']);
      relation.getAs().should.deep.equal(['user1','user2','user3','user4']);
    })
  })
  describe('BinaryRelation.getBs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.getBs('user1').should.deep.equal([]);
      relation.getBs().should.deep.equal([]);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.getBs('user1').should.deep.equal(['book1']);
      relation.getBs().should.deep.equal(['book1']);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.getBs('user1').should.deep.equal(['book1']);
      relation.getBs().should.deep.equal(['book1']);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.getBs('user1').should.deep.equal([]);
      relation.getBs().should.deep.equal([]);
    })
    it('reports several added elements',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book2');
      relation.add('user1', 'book3');
      relation.add('user1', 'book1');
      relation.add('user2', 'book1');
      relation.add('user3', 'book1');
      relation.add('user4', 'book4');
      relation.getBs('user1').should.have.members(['book1','book2','book3']);
      relation.getBs('user2').should.have.members(['book1']);
      relation.getBs('user3').should.have.members(['book1']);
      relation.getBs('user4').should.have.members(['book4']);
      relation.getBs().should.have.members(['book1','book2','book3','book4']);
    })
  })
  describe('BinaryRelation.countAs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.countAs('user1').should.equal(0);
      relation.countAs().should.equal(0);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.countAs('book1').should.equal(1);
      relation.countAs().should.equal(1);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.countAs('book1').should.equal(1);
      relation.countAs().should.equal(1);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.countAs('book1').should.equal(0);
      relation.countAs().should.equal(0);
    })
    it('reports several added elements',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book2');
      relation.add('user1', 'book3');
      relation.add('user1', 'book1');
      relation.add('user2', 'book1');
      relation.add('user3', 'book1');
      relation.add('user4', 'book4');
      relation.countAs('book1').should.equal(3);
      relation.countAs('book2').should.equal(1);
      relation.countAs('book3').should.equal(1);
      relation.countAs('book4').should.equal(1);
      relation.countAs().should.equal(4);
    })
  })
  describe('BinaryRelation.countBs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.countBs('user1').should.equal(0);
      relation.countBs().should.equal(0);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.countBs('user1').should.equal(1);
      relation.countBs().should.equal(1);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.countBs('user1').should.equal(1);
      relation.countBs().should.equal(1);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.countBs('user1').should.equal(0);
      relation.countBs().should.equal(0);
    })
    it('reports several added elements',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book2');
      relation.add('user1', 'book3');
      relation.add('user1', 'book1');
      relation.add('user2', 'book1');
      relation.add('user3', 'book1');
      relation.add('user4', 'book4');
      relation.countBs('user1').should.equal(3);
      relation.countBs('user2').should.equal(1);
      relation.countBs('user3').should.equal(1);
      relation.countBs('user4').should.equal(1);
      relation.countBs().should.equal(4);
    })
  })
})

