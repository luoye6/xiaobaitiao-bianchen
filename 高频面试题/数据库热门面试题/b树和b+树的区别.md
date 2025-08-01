# b树和b+树的区别

> 本文作者：[程序员小白条](https://github.com/luoye6)
>
> 本站地址：[https://xbt.xiaobaitiao.top](https://xbt.xiaobaitiao.top)

- 在B树中，你可以将键和值存放在内部节点和叶子节点；但在B+树中，内部节点都是键，没有值，叶子节点同时存放键和值。
- B+树的叶子节点有一条链相连，而B树的叶子节点各自独立。
- 由于B+树在内部节点上不包含数据信息，因此在内存页中能够存放更多的key。 数据存放的更加紧密，具有更好的空间局部性。因此访问叶子节点上关联的数据也具有更好的缓存命中率。
- B+树的叶子结点都是相链的，因此对整棵树的便利只需要一次线性遍历叶子结点即可。而且由于数据顺序排列并且相连，所以便于区间查找和搜索。而B树则需要进行每一层的递归遍历。相邻的元素可能在内存中不相邻，所以缓存命中性没有B+树好。
- 但是B树也有优点，其优点在于，由于B树的每一个节点都包含key和value，因此经常访问的元素可能离根节点更近，因此访问也更迅速。
- B 树:优点：

- - 快速的查找和插入操作;
  - 适合大数据量、高并发的场景;
  - 内部数据结构稳定，能够保证树形结构的可靠性。

- 缺点：

- - 存储容量较大，需要更多的存储空间;
  - 树的高度较高，会导致查询效率降低。

- 使用场景：

- - 对于需要快速查找、插入操作的大数据量场景，如搜索引擎、数据挖掘等;
  - 需要支持并发访问的场景，如金融交易系统等。

- B+树:优点：

- - 相对于 B 树，B+树的存储容量较小，更节省存储空间;
  - 查询效率更高，更适合大数据量、低并发的场景;
  - 内部数据结构更加稳定，能够保证树形结构的可靠性。

- 缺点：

- - 查找和插入操作的性能比 B 树略低;
  - 树的高度较高，会导致查询效率降低。

- 使用场景：

- - 对于需要高效查询、少量插入和删除操作的大数据量场景，如电子商务网站等;
  - 需要支持并发访问的场景，如金融交易系统等。