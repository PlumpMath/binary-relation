import * as chai from "chai";
import BinaryRelation from "../binary-relation";

chai.should();

describe('BinaryRelation',()=>{
  describe('BinaryRelation.contains', () => {
    it('initially reports no link', () => {
      var relation = new BinaryRelation();
      relation.contains('user1', 'book1').should.equal(false);
    })
    it('reports a link after add', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1')
      relation.contains('user1', 'book1').should.equal(true);
    })
    it('reports no link after removal', () => {
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(false);
    })
  });
  describe('BinaryRelation.add',()=>{
    it('reports a link after add',()=>{
      var relation = new BinaryRelation();
      relation.contains('user1', 'book1').should.equal(false);
      relation.add('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(true);
    })
    it('handles repetition well',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(true);
      relation.remove('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(false);
    })
  })
  describe('BinaryRelation.remove',()=>{
    it('reports no link after removal',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(true);
      relation.remove('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(false);
    })
    it('handles repetition well',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(true);
      relation.remove('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(false);
      relation.remove('user1', 'book1');
      relation.contains('user1', 'book1').should.equal(false);
    })
  })
  describe('BinaryRelation.getAs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.getAs('user1').should.deep.equal([]);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.getAs('book1').should.deep.equal(['user1']);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.getAs('book1').should.deep.equal(['user1']);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.getAs('book1').should.deep.equal([]);
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
    })
  })
  describe('BinaryRelation.getBs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.getBs('user1').should.deep.equal([]);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.getBs('user1').should.deep.equal(['book1']);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.getBs('user1').should.deep.equal(['book1']);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.getBs('user1').should.deep.equal([]);
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
    })
  })
  describe('BinaryRelation.countAs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.countAs('user1').should.equal(0);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.countAs('book1').should.equal(1);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.countAs('book1').should.equal(1);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.countAs('book1').should.equal(0);
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
    })
  })
  describe('BinaryRelation.countBs',()=>{
    it('initially reports nothing',()=>{
      var relation = new BinaryRelation();
      relation.countBs('user1').should.equal(0);
    })
    it('reports single element',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.countBs('user1').should.equal(1);
    })
    it('reports single element after double add',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.countBs('user1').should.equal(1);
    })
    it('reports nothing after double add and single remove',()=>{
      var relation = new BinaryRelation();
      relation.add('user1', 'book1');
      relation.add('user1', 'book1');
      relation.remove('user1', 'book1');
      relation.countBs('user1').should.equal(0);
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
    })
  })
})

