# **Flyweight Design Pattern**

## 1. **Definition**

The **Flyweight pattern** is a **structural design pattern** that minimizes memory usage by sharing as much data as possible between similar objects.
Instead of creating a large number of identical or nearly identical objects, we separate their state into:

* **Intrinsic state** → Shared, immutable data (common across many objects).
* **Extrinsic state** → Unique, contextual data (passed from outside when needed).

So instead of **duplicating memory-heavy objects**, we **reuse a small pool of flyweights**.

---

## 2. **When to Use Flyweight**

You use Flyweight when:

1. Your program needs to create **a huge number of objects** (e.g., millions).
2. Many of those objects share **similar or identical data**.
3. Memory usage is a bottleneck.
4. You can separate shared state (intrinsic) from unique state (extrinsic).

---

## 3. **Real-world Analogies**

* **Text editor characters**
  Each character ('a', 'b', 'c', …) is stored once in memory (intrinsic state: font, style).
  The position (extrinsic state: x,y coordinate in the document) is stored separately.

* **Chess game**
  Pieces of the same type (e.g., black pawn, white pawn) share common properties (color, type, movement rules).
  Only their position on the board changes (extrinsic).

* **Trees in a forest simulation**
  A forest with 1,000,000 trees → instead of storing a million copies of "tree type = oak, color = green, texture = rough," store one **flyweight object** for oak, and just keep extrinsic states like (x,y,z position).

* **Font rendering in GUIs**
  Each font glyph is stored once, reused everywhere.

---

## 4. **Types of Flyweights**

1. **Pure Flyweights** → Only intrinsic state is stored in the flyweight. All extrinsic state is passed externally.
   Example: A `Character` flyweight that only knows the letter (‘A’, ‘B’, …).

2. **Composite Flyweights** → A flyweight that groups multiple flyweights inside.
   Example: A `Word` object that is made up of multiple `Character` flyweights.

---

## 5. **Relation to Other Patterns**

* **Factory Pattern** → Often used to create and manage flyweights (Flyweight Factory ensures reusability).
* **Singleton Pattern** → A flyweight instance can be treated like a singleton for shared data.
* **Proxy Pattern** → Both reduce resource usage, but **Proxy controls access**, while **Flyweight reduces memory usage**.
* **Composite Pattern** → Flyweight can be combined with Composite when building large structures (e.g., text documents with words and characters).
* **Decorator Pattern** → Instead of duplicating objects for different states, decorators can wrap flyweights to add extrinsic behavior.

---

## 6. **Code Example (Tree Simulation in JS)**

```js
// Flyweight class
class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  draw(x, y) {
    console.log(`Drawing ${this.name} tree at (${x},${y}) with ${this.color} color`);
  }
}

// Flyweight Factory
class TreeFactory {
  constructor() {
    this.treeTypes = {};
  }

  getTreeType(name, color, texture) {
    const key = name + color + texture;
    if (!this.treeTypes[key]) {
      this.treeTypes[key] = new TreeType(name, color, texture);
    }
    return this.treeTypes[key];
  }
}

// Context: Stores extrinsic state
class Tree {
  constructor(x, y, treeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }

  draw() {
    this.treeType.draw(this.x, this.y);
  }
}

// Usage
const factory = new TreeFactory();
const oak = factory.getTreeType("Oak", "Green", "Rough");
const pine = factory.getTreeType("Pine", "DarkGreen", "Smooth");

const trees = [
  new Tree(1, 2, oak),
  new Tree(5, 8, oak),
  new Tree(10, 15, pine),
];

trees.forEach(tree => tree.draw());
```

🔹 Here, **TreeType** is the flyweight (intrinsic state).
🔹 **Tree (context)** holds extrinsic state (x,y).
🔹 The factory ensures only one flyweight per unique combination.

---

✅ **In short:**
Flyweight is all about **sharing common data efficiently**. Use it when you need **millions of similar objects** but don’t want to waste memory.

---

Great question 👌 — let’s ground **Flyweight** in **real-world, industry-grade examples** where it’s actually applied.

---

# **Industry Examples of Flyweight Pattern**

### 1. **Game Development**

* **Use case:** Large worlds with millions of objects.
* **Example:**

  * **Minecraft** → Blocks like dirt, stone, grass all share textures & behavior (flyweight). Only coordinates & metadata (extrinsic state) differ.
  * **Chess/Board Games** → Each type of piece is a flyweight; only position is different.
  * **Shooter Games (e.g., PUBG, COD)** → Bullets, explosions, particle effects reuse flyweights for performance.

---

### 2. **Text Rendering Engines**

* **Use case:** Rendering thousands of characters on screen.
* **Example:**

  * **Microsoft Word / Google Docs** → Each character (‘a’, ‘b’, …) is stored once per font-style. Only extrinsic state like position, formatting (bold/italic), is stored separately.
  * **PDF Readers** → Fonts are embedded once and glyphs are reused.

---

### 3. **Web Browsers**

* **Use case:** Optimize rendering performance.
* **Example:**

  * **Chrome / Firefox** store CSS stylesheets and DOM element prototypes in flyweights so similar elements (like `<div>`, `<span>`) don’t bloat memory.
  * Image rendering → Same image cached once, reused across multiple `<img>` tags.

---

### 4. **GUI Frameworks**

* **Use case:** Repeated UI elements.
* **Example:**

  * **Qt, WPF, Swing** → Buttons, icons, scrollbars, etc. share flyweight objects (styles, skins). Only their position/state changes.
  * **Mobile apps (iOS/Android)** → Reusable cell rendering in lists/tables (`RecyclerView` in Android is a flyweight-like pattern).

---

### 5. **Database Connection Pools**

* **Use case:** Avoid heavy instantiation of connections.
* **Example:**

  * **JDBC / Node.js connection pools** → Instead of creating new connections each time, flyweight connections are reused with different queries as extrinsic data.

*(Strictly speaking, it’s closer to Object Pool pattern, but under the hood, connections share common resources like sockets, auth tokens — which is flyweight-ish.)*

---

### 6. **IDE Syntax Highlighting**

* **Use case:** Handling huge source files.
* **Example:**

  * **VS Code / IntelliJ** → Each keyword (`if`, `else`, `class`) doesn’t create a new object. Instead, a shared flyweight token object is reused, only storing line/column positions externally.

---

### 7. **Document/Graphics Software**

* **Use case:** Complex vector graphics with repeated shapes.
* **Example:**

  * **Adobe Illustrator / Figma** → Multiple circles or icons share a single flyweight definition. The transformation (position, scale, rotation) is extrinsic.
  * **Google Maps** → Same road/house icon reused across millions of map tiles.

---

### 8. **Networking & Protocols**

* **Use case:** Large number of lightweight packets or objects.
* **Example:**

  * **HTTP/2 & QUIC** protocols reuse headers via HPACK (header compression) — a flyweight-like approach.
  * **WebSockets / MQTT clients** reuse flyweight message templates, only filling extrinsic payload.

---

# **Summary**

Flyweight is heavily used in:

* **Gaming** (repeated objects → trees, bullets, textures)
* **Text rendering** (fonts, characters, tokens)
* **Web browsers & GUIs** (DOM, UI widgets)
* **Development tools** (syntax highlighting, IDEs)
* **Maps/Graphics** (repeated shapes/icons)
* **Networking** (reusable headers, packets)

---

👉 A **mental shortcut**:
Whenever you see **"millions of repeated objects with little variation"**, industry tends to use **Flyweight**.

---

Do you want me to also draw a **comparison table** of **Flyweight vs Object Pool vs Cache**, since in industry they often overlap and people confuse them?
