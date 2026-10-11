import test from 'node:test';
import assert from 'node:assert/strict';
import { initialWallet, equipItem, purchaseItem, awardCoins, readWallet, saveWallet } from '../companion.js';
import { topicPassed } from '../practice.js';
import { roomDirectory, voiceRoom } from '../rooms.js';

test('wardrobe locks enforce ownership and purchases debit once',()=>{
 const w=initialWallet();
 assert.deepEqual(w.owned,['basic','tidy']);
 assert.equal(equipItem(w,'jacket'),false);
 assert.equal(purchaseItem(w,'jacket'),'insufficient');
 assert.equal(w.coins,0);
 assert.equal(awardCoins(w,'topic:cafe',30,'Café'),true);
 assert.equal(awardCoins(w,'topic:cafe',30,'Café'),false);
 assert.equal(awardCoins(w,'daily:test',20,'Daily'),true);
 assert.equal(purchaseItem(w,'flower'),'purchased');
 assert.equal(w.coins,10);
 assert.ok(w.equipped.includes('flower'));
 assert.equal(purchaseItem(w,'flower'),'owned');
 assert.equal(w.coins,10);
 assert.equal(equipItem(w,'flower'),true);
 assert.ok(!w.equipped.includes('flower'));
});
test('wallet migration removes unowned previews and old accessories, keeps purchases',()=>{
 const memory=new Map(); globalThis.localStorage={getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v)};
 localStorage.setItem('barev-companion',JSON.stringify({coins:45,name:'<Ani>',gender:'male',age:'adult',owned:['hoodie','flower'],equipped:['jacket','curls','flower'],earned:['topic:cafe']}));
 let w=readWallet();
 assert.equal(w.gender,'female'); assert.equal(w.age,'teen'); assert.equal(w.name,'Ani');
 assert.ok(w.owned.includes('hoodie')); assert.ok(w.owned.includes('basic'));
 assert.deepEqual(w.equipped,['tidy','basic']);
 equipItem(w,'hoodie'); equipItem(w,'flower'); saveWallet(w); w=readWallet();
 assert.ok(w.equipped.includes('hoodie')); assert.ok(!w.equipped.includes('flower'));
 assert.equal(w.coins,45); assert.deepEqual(w.earned,['topic:cafe']);
 delete globalThis.localStorage;
});
test('only completed matching topics unlock and room UI offers practice for the rest',()=>{
 const state={completedTopics:['cafe']};
 assert.equal(topicPassed(state,'cafe'),true); assert.equal(topicPassed(state,'airport'),false);
 const html=roomDirectory(state);
 assert.match(html,/data-topic-room="cafe"/);
 assert.match(html,/data-topic-room="airport"/);
 const locked=voiceRoom({...state,roomTopic:'airport',muted:true,roomMessages:[]});
 assert.match(locked,/Unlock with practice/);
 assert.match(locked,/chat-control" disabled/);
 assert.match(locked,/disabled data-action="room-mute"/);
 const unlocked=voiceRoom({...state,roomTopic:'cafe',muted:true,roomMessages:[]});
 assert.doesNotMatch(unlocked,/Unlock with practice/);
 assert.doesNotMatch(unlocked,/disabled data-action="room-mute"/);
});
