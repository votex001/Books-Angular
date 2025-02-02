import { loggerService } from "../../services/logger.service.js";
import { booksService } from "./books.service.js";

export async function getBooks(req, res) {
  try {
    // const { search, lang, page } = req.query;
    // const filter = {};
    // if (search) filter.search = search;
    // if (lang && lang !== "all") filter.lang = lang;
    // if (page) filter.page = page;

    // const data = await booksService.query(filter);
    // const filteredData = {
    //   ...data,
    //   results: data.results.map((book) => {
    //     delete book.translators;
    //     delete book.bookshelves;
    //     delete book.subjects;
    //     book.authors = book.authors.map((author) => {
    //       return {
    //         name: author.name,
    //       };
    //     });
    //     book.cover = book.formats["image/jpeg"];
    //     delete book.formats;
    //     delete book["media_type"];
    //     delete book.copyright;
    //     return book;
    //   }),
    // };
    // delete filteredData.next;
    // delete filteredData.previous;
    res.send({
      "count": 75081,
      "results": [
          {
              "id": 25558,
              "title": "呻吟語",
              "authors": [
                  {
                      "name": "Lü, Kun"
                  }
              ],
              "summaries": [
                  "\"呻吟語\" by Kun Lü is a philosophical treatise written in the late 16th century. This text delves into the experiences of suffering, personal reflections on health and illness, and the deeper meanings behind emotions and existence. The work explores the universal nature of pain and understanding, encouraging readers to contemplate their own experiences and the connections to the plight of others.  The opening of \"呻吟語\" introduces the author's thoughts on the nature of illness and suffering, revealing a deeply personal struggle with chronic ailments. The author reflects on the difficulty of articulating pain and the fleeting nature of health, as well as the insights gained from shared experiences of suffering with others. Through conversations with a friend, the text underscores the idea that all individuals carry their own burdens and that awareness of these shared struggles can foster empathy and compassion, culminating in a broader understanding of life's inherent challenges. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "zh"
              ],
              "download_count": 268038,
              "cover": "https://www.gutenberg.org/cache/epub/25558/pg25558.cover.medium.jpg"
          },
          {
              "id": 84,
              "title": "Frankenstein; Or, The Modern Prometheus",
              "authors": [
                  {
                      "name": "Shelley, Mary Wollstonecraft"
                  }
              ],
              "summaries": [
                  "\"Frankenstein; Or, The Modern Prometheus\" by Mary Wollstonecraft Shelley is a novel written in the early 19th century. The story explores themes of ambition, the quest for knowledge, and the consequences of man's hubris through the experiences of Victor Frankenstein and the monstrous creation of his own making.   The opening of the book introduces Robert Walton, an ambitious explorer on a quest to discover new lands and knowledge in the icy regions of the Arctic. In his letters to his sister Margaret, he expresses both enthusiasm and the fear of isolation in his grand venture. As Walton's expedition progresses, he encounters a mysterious, emaciated stranger who has faced great suffering—furthering the intrigue of his narrative. This stranger ultimately reveals his tale of creation, loss, and the profound consequences of seeking knowledge that lies beyond human bounds. The narrative is set up in a manner that suggests a deep examination of the emotions and ethical dilemmas faced by those who dare to defy the natural order. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 107767,
              "cover": "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg"
          },
          {
              "id": 46,
              "title": "A Christmas Carol in Prose; Being a Ghost Story of Christmas",
              "authors": [
                  {
                      "name": "Dickens, Charles"
                  }
              ],
              "summaries": [
                  "\"A Christmas Carol in Prose; Being a Ghost Story of Christmas\" by Charles Dickens is a novella written in the early 19th century. The story centers around Ebenezer Scrooge, a miserly old man, who is transformed after being visited by the ghost of his deceased partner, Jacob Marley, and the spirits of Christmas Past, Present, and Yet to Come. The novella explores themes of redemption, compassion, and the true spirit of Christmas, emphasizing the importance of generosity and kindness.  The opening of the story establishes Scrooge's character as cold-hearted and uncharitable, focusing heavily on his disdain for Christmas and his lack of empathy towards others. As the narrative begins, Marley's ghost visits him to warn Scrooge of the dire consequences of his selfishness, foreshadowing the transformative journey that will follow. Scrooge's interactions with his cheerful nephew and the charitable gentlemen seeking donations highlight his isolation and bitterness, setting the stage for the exploration of his past, present, and future through ghostly visitations. This initial setup creates a compelling contrast between Scrooge's grim reality and the joy of the festive season that others experience around him. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 93151,
              "cover": "https://www.gutenberg.org/cache/epub/46/pg46.cover.medium.jpg"
          },
          {
              "id": 2701,
              "title": "Moby Dick; Or, The Whale",
              "authors": [
                  {
                      "name": "Melville, Herman"
                  }
              ],
              "summaries": [
                  "\"Moby Dick; Or, The Whale\" by Herman Melville is a novel written in the mid-19th century. The story follows Ishmael, a sailor on a whaling voyage, who seeks adventure and escape from his gloomy life on land. As he embarks on this journey, he becomes drawn into the complex world of whaling and is introduced to the ominous figure of Captain Ahab, whose obsession with a legendary white whale ultimately drives the narrative.  At the start of the novel, Ishmael introduces himself and shares his philosophy about the sea as a remedy for his melancholic disposition. He muses on the magnetic pull of the ocean, describing not only his own urge to set sail but also the collective longing of city dwellers for the water. Ishmael's journey takes him to New Bedford, where he experiences a series of humorous and strange encounters while seeking lodging before joining a whaling ship. As he navigates his way through the town, he is introduced to Queequeg, a tattooed harpooner with a mysterious past, setting the stage for a unique friendship that unfolds amidst the backdrop of whaling adventures. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 73324,
              "cover": "https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg"
          },
          {
              "id": 24162,
              "title": "二刻拍案惊奇",
              "authors": [
                  {
                      "name": "Ling, Mengchu"
                  }
              ],
              "summaries": [
                  "\"二刻拍案惊奇\" by Mengchu Ling is a collection of short stories written in the early 17th century. The book features a variety of tales that explore themes of morality, justice, and the supernatural, often illustrated through the experiences of its characters, including monks and individuals entangled in societal issues.   The opening of the work sets a reflective tone, incorporating literary allusions and philosophical musings about the nature of storytelling and the value of written words. It discusses the significance of preserving knowledge through texts, emphasizing the consequences of neglect and the fate of precious documents. The narrative then transitions to a specific incident involving a monk named 辨悟, who proposes selling a cherished manuscript, the \"金刚经,\" to address a food shortage in his temple. However, circumstances lead to a remarkable series of events that intertwine the fates of individuals connected to this manuscript, setting the stage for tales of moral choices and supernatural occurrences in the stories to follow. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "zh"
              ],
              "download_count": 73196,
              "cover": "https://www.gutenberg.org/cache/epub/24162/pg24162.cover.medium.jpg"
          },
          {
              "id": 27104,
              "title": "歸蓮夢",
              "authors": [
                  {
                      "name": "Su'anzhuren, active 18th century"
                  }
              ],
              "summaries": [
                  "\"歸蓮夢\" by active 18th century Su'anzhuren is a novel written in the late 18th century. The story seems to revolve around themes of poverty, compassion, and the complexities of human nature, following the lives of characters impacted by fate and their moral choices. The opening chapters introduce a couple, the Baishuang family, known for their good nature but also their extreme frugality, who desire a child and turn to spiritual means to achieve their goal.   The beginning of the novel sets the stage by exploring philosophical reflections about life and dreams while establishing the protagonist, Bai Shuang, and his wife, who, after years of hard work without children, seek the blessings of the mountain gods. Their journey takes a mystical turn as Bai Shuang dreams of a celestial being who offers them a lotus flower, symbolizing hope and the possibility of parenthood. However, their frugality ultimately leads to tragic consequences as they perish in a famine, leaving their daughter, Lian An, to fend for herself, highlighting the conflict between human desires, spiritual pursuits, and harsh realities. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "zh"
              ],
              "download_count": 70836,
              "cover": "https://www.gutenberg.org/cache/epub/27104/pg27104.cover.medium.jpg"
          },
          {
              "id": 1513,
              "title": "Romeo and Juliet",
              "authors": [
                  {
                      "name": "Shakespeare, William"
                  }
              ],
              "summaries": [
                  "\"Romeo and Juliet\" by William Shakespeare is a tragedy likely written during the late 16th century. The play centers on the intense love affair between two young lovers, Romeo Montague and Juliet Capulet, whose families are embroiled in a bitter feud. Their love, while passionate and profound, is met with adversities that ultimately lead to tragic consequences.  At the start of the play, a Prologue delivered by the Chorus sets the stage for the tale of forbidden love, revealing the familial conflict that surrounds Romeo and Juliet. The opening scenes depict a public brawl ignited by the feud between the Montagues and Capulets, showcasing the hostility that envelops their lives. As we are introduced to various characters such as Benvolio, Tybalt, and Mercutio, we learn of Romeo's unrequited love for Rosaline. However, this quickly changes when Romeo encounters Juliet at the Capulet ball, where they share a famous and romantic exchange, unwittingly falling in love with each other despite their families' bitter enmity. This initial encounter foreshadows the obstacles they will face as their love story unfolds amidst chaos and conflict. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 67820,
              "cover": "https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg"
          },
          {
              "id": 100,
              "title": "The Complete Works of William Shakespeare",
              "authors": [
                  {
                      "name": "Shakespeare, William"
                  }
              ],
              "summaries": [
                  "\"The Complete Works of William Shakespeare\" by William Shakespeare is a collection of classic literary works written in the late 16th to early 17th centuries. This comprehensive anthology includes a wide range of genres, encompassing sonnets, comedies, histories, and tragedies, all showcasing Shakespeare's unparalleled mastery of language and character development. Important themes such as love, ambition, betrayal, and the complexities of human nature resonate throughout these timeless pieces.  At the start of this collection, the reader is immediately introduced to Shakespeare's \"Sonnets,\" which serve as an eloquent prelude to his themes of love and beauty. These opening verses explore the fleeting nature of beauty and time, with a poignant focus on the necessity of procreation to preserve youthful beauty. The sonnets address a young man of remarkable beauty and the poet's passionate urge for him to reproduce, emphasizing the tensions between self-love and the desire for legacy. Through rhythmic language and rich imagery, the sonnets present a universal contemplation on love, mortality, and the human experience, inviting readers to engage deeply with concepts that remain relevant today. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 51713,
              "cover": "https://www.gutenberg.org/cache/epub/100/pg100.cover.medium.jpg"
          },
          {
              "id": 145,
              "title": "Middlemarch",
              "authors": [
                  {
                      "name": "Eliot, George"
                  }
              ],
              "summaries": [
                  "\"Middlemarch\" by George Eliot is a novel written in the mid-19th century that explores the lives and interactions of residents in a provincial English town. The story primarily centers around Dorothea Brooke, a young woman with high ideals and aspirations for a meaningful life, who grapples with her search for love and purpose amid societal expectations. The novel addresses themes of marriage, ambition, and the intersection of personal and social values in a rapidly changing world.  At the start of the novel, we are introduced to Miss Brooke, who is depicted as a strikingly beautiful and intelligent young woman, yet may be seen as eccentric due to her lofty aspirations and disregard for societal norms. She lives with her sister Celia and their uncle, Mr. Brooke, in a quiet country house, harboring dreams of making a significant impact on the world. As the opening chapters unfold, we see her rejection of traditional feminine pursuits and her desire to be with a man of intellect who can match her aspirations. Important characters such as the learned Reverend Edward Casaubon and the kind Sir James Chettam emerge, each representing different paths and values that will challenge Dorothea in her quest for fulfillment. The complexities of their interactions are foreshadowed early on, setting the stage for a rich exploration of human relationships and personal growth. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 50930,
              "cover": "https://www.gutenberg.org/cache/epub/145/pg145.cover.medium.jpg"
          },
          {
              "id": 2641,
              "title": "A Room with a View",
              "authors": [
                  {
                      "name": "Forster, E. M. (Edward Morgan)"
                  }
              ],
              "summaries": [
                  "\"A Room with a View\" by E. M. Forster is a novel written during the early 20th century, which explores themes of social conventions and personal freedom. Set primarily in Italy and England, the narrative follows the journey of Lucy Honeychurch, a young woman navigating her feelings about love, societal expectations, and her own desires against the backdrop of her experiences abroad.  The opening of the story introduces the character of Lucy and her cousin Charlotte Bartlett as they arrive at the Pension Bertolini in Florence. Disappointed by the accommodation’s lack of a promised view, they bicker about their arrangements. Lucy's eagerness to experience Italy conflicts with Charlotte's more cautious demeanor. Here, the reader meets Mr. Emerson and his son George, who challenge the norms of polite society, offering their rooms to Lucy and Charlotte out of kindness, which Charlotte initially declines. The tension between personal desires and societal expectations is palpable, setting the stage for Lucy's internal conflict and her eventual blossoming into independence and self-discovery. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 50760,
              "cover": "https://www.gutenberg.org/cache/epub/2641/pg2641.cover.medium.jpg"
          },
          {
              "id": 37106,
              "title": "Little Women; Or, Meg, Jo, Beth, and Amy",
              "authors": [
                  {
                      "name": "Alcott, Louisa May"
                  }
              ],
              "summaries": [
                  "\"Little Women; Or, Meg, Jo, Beth, and Amy\" by Louisa May Alcott is a classic novel written in the mid-19th century. The story revolves around the lives and experiences of four sisters—Meg, Jo, Beth, and Amy March—as they navigate the challenges of growing up in a modest household during the American Civil War. The novel explores themes of family, sacrifice, and the pursuit of personal dreams, showcasing the distinct personalities and aspirations of each sister.  The opening of the book introduces readers to the March sisters, who are grappling with their financial struggles and longing for a more comfortable life. As they gather around the fire to express their frustrations about being poor, their mother reinforces the idea that they should embrace gratitude and make sacrifices for those suffering during the war, particularly their father, who is away serving as a chaplain. This chapter sets the tone for the sisters' individual journeys, highlighting their different approaches to hardship—Meg longs for material wealth, Jo is a spirited tomboy who craves independence, Beth is the gentle peacemaker, and Amy is the aspiring artist concerned with appearances. Through their interactions and hopes, Alcott paints a vivid picture of their lives, filled with warmth, humor, and the bonds of sisterhood. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 48574,
              "cover": "https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg"
          },
          {
              "id": 11,
              "title": "Alice's Adventures in Wonderland",
              "authors": [
                  {
                      "name": "Carroll, Lewis"
                  }
              ],
              "summaries": [
                  "\"Alice's Adventures in Wonderland\" by Lewis Carroll is a classic children's novel written in the mid-19th century. The story follows a young girl named Alice who, feeling bored and sleepy while sitting by a riverbank, encounters a White Rabbit and follows it down a rabbit hole, plunging into a fantastical world filled with curious creatures and whimsical adventures.  The opening of the book introduces Alice as she daydreams about her surroundings before spotting the White Rabbit, who is both flustered and animated. Curious, Alice pursues the Rabbit and finds herself tumbling down a deep rabbit hole, leading to a curious hall filled with doors, all locked. After experiencing a series of bizarre changes in size from eating and drinking mysterious substances, she begins exploring this new world, initially frustrated by her newfound challenges as she navigates her size and the peculiar inhabitants she meets. The narrative sets the tone for Alice's whimsical and often nonsensical adventures that characterize the entire tale. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 43939,
              "cover": "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg"
          },
          {
              "id": 67979,
              "title": "The Blue Castle: a novel",
              "authors": [
                  {
                      "name": "Montgomery, L. M. (Lucy Maud)"
                  }
              ],
              "summaries": [
                  "\"The Blue Castle\" by L. M. Montgomery is a novel written in the early 20th century. The story centers around Valancy Stirling, a nearly thirty-year-old woman who feels trapped in her life as an unmarried woman in a family that shows little regard for her. The opening of the novel introduces Valancy's bleak existence, characterized by a suffocating home life and a longing for romance and meaning that she has never experienced.  At the start of the book, Valancy awakens on a rainy morning weighed down by her impending birthday and the realization of her unfulfilled life. As she reflects on her circumstances, the reader gains insight into her despair and her dreams of an idealized life represented by her fantastical \"Blue Castle.\" She feels oppressed by her family's expectations and by her status as a \"hopeless old maid.\" Valancy's introspection reveals both her sense of humor and her deep-rooted sorrow, setting the stage for the profound changes that her impending fate may bring. The subsequent narrative promises to explore themes of self-discovery and rebellion against familial constraints as Valancy contemplates her situation. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 43828,
              "cover": "https://www.gutenberg.org/cache/epub/67979/pg67979.cover.medium.jpg"
          },
          {
              "id": 16389,
              "title": "The Enchanted April",
              "authors": [
                  {
                      "name": "Von Arnim, Elizabeth"
                  }
              ],
              "summaries": [
                  "\"The Enchanted April\" by Elizabeth Von Arnim is a novel written in the early 20th century. The story revolves around four women who seek a transformative escape from their mundane lives in cold, rainy England to the alluring sunshine of a mediaeval castle in Italy. The main characters introduced are Mrs. Wilkins and Mrs. Arbuthnot, both of whom are discontented with their respective circumstances and longing for a change.  At the start of the novel, Mrs. Wilkins, feeling trapped in her drab life, stumbles upon an advertisement for a rental castle in Italy while at a Women's Club in London. Drawn to the idea of warmth and beauty, she impulsively starts a conversation with the similarly yearning Mrs. Arbuthnot. As they discuss the advertisement, an unexpected bond forms, leading them to consider sharing the castle with two other women to make the plan financially feasible. This opening sets the stage for an uplifting journey where the characters’ quest for personal joy and freedom unfolds against the backdrop of picturesque Italy, suggesting themes of self-discovery and the rejuvenating power of adventure. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 43526,
              "cover": "https://www.gutenberg.org/cache/epub/16389/pg16389.cover.medium.jpg"
          },
          {
              "id": 38769,
              "title": "A Course of Pure Mathematics: Third Edition",
              "authors": [
                  {
                      "name": "Hardy, G. H. (Godfrey Harold)"
                  }
              ],
              "summaries": [],
              "languages": [
                  "en"
              ],
              "download_count": 41687,
              "cover": "https://www.gutenberg.org/cache/epub/38769/pg38769.cover.medium.jpg"
          },
          {
              "id": 6761,
              "title": "The Adventures of Ferdinand Count Fathom — Complete",
              "authors": [
                  {
                      "name": "Smollett, T. (Tobias)"
                  }
              ],
              "summaries": [
                  "\"The Adventures of Ferdinand Count Fathom\" by Tobias Smollett is a satirical novel written in the mid-18th century. The narrative follows the cunning and morally ambiguous character of Ferdinand Count Fathom, a man of mysterious parentage armed with an extraordinary talent for deception and manipulation. The story sets the stage for themes of vice and virtue, exploring Fathom’s escapades and schemes as he navigates a world ripe for exploitation.  The opening of the novel introduces Fathom in an unusual light—born under strange circumstances to a mother who flitted between roles in military encampments and armies. We explore the early influence of his mother, an adventurous and fierce figure whose exploits paint a picture of a wild and unrestrained environment. As Fathom grows, he exhibits a blend of charisma and villainy, drawing the attention of powerful patrons while developing ambitions of his own. With a sharp wit and an ability to adapt, he becomes both an object of admiration and contempt, preparing the reader for a complex journey through deceit, ambition, and the nature of morality. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 40812,
              "cover": "https://www.gutenberg.org/cache/epub/6761/pg6761.cover.medium.jpg"
          },
          {
              "id": 394,
              "title": "Cranford",
              "authors": [
                  {
                      "name": "Gaskell, Elizabeth Cleghorn"
                  }
              ],
              "summaries": [
                  "\"Cranford\" by Elizabeth Cleghorn Gaskell is a novel written in the mid-19th century. The story unfolds in a small English village dominated by women, where men are conspicuously absent from social life. The narrative is rich with observations about the peculiar rituals, customs, and dynamics of the tight-knit community, primarily focusing on the lives of its female inhabitants, including the amiable and kind-hearted Miss Matty and the spirited Captain Brown, who disrupts their tranquil existence.  At the start of \"Cranford,\" we are introduced to the unique social structure of the village, characterized by its predominantly female residents who manage their affairs without the presence of men, aside from the occasional visitor. The opening chapter humorously details the societal norms and the unspoken rules that govern interactions, such as visiting etiquette and the preference for economy over ostentation. Key characters like the gentle Miss Matty and the charismatic Captain Brown are introduced, hinting at a deeper exploration of human relationships and character development as the story progresses. Through the eyes of the narrator, the reader gets a glimpse into the endearing quirks and camaraderie of the Cranford community, setting the stage for the unfolding tales of friendship, love, and social commentary that define this charming novel. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 40460,
              "cover": "https://www.gutenberg.org/cache/epub/394/pg394.cover.medium.jpg"
          },
          {
              "id": 2160,
              "title": "The Expedition of Humphry Clinker",
              "authors": [
                  {
                      "name": "Smollett, T. (Tobias)"
                  }
              ],
              "summaries": [
                  "\"The Expedition of Humphry Clinker\" by Tobias Smollett is a novel written during the mid-18th century. This humorous work explores the journey and misadventures of the Bramble family and their companions as they travel through Wales and England, providing a satirical glimpse into the social and cultural life of the time. The story is primarily told through a series of letters, offering a diverse range of perspectives from its characters, including the hypochondriac Matthew Bramble and his lively niece, Lydia Melford.  The opening of the novel introduces several key characters through a series of letters among various recipients. The narrative begins with Jonathan Dustwich, who writes to Mr. Henry Davis about his plans to publish a collection of letters, asserting the importance of their content. We also meet Matthew Bramble, who expresses his ailments and frustrations with familial responsibilities, alluding to troublesome interactions with his niece’s romantic interests. As they prepare for a trip to the Hot Well in Bristol, the Bramble family’s dynamic begins to unfold, hinting at both familial loyalty and the conflicts that arise from their contrasting personalities. Ultimately, the beginning sets the stage for a blend of comedy, social commentary, and insight into human relationships throughout their journey. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 40074,
              "cover": "https://www.gutenberg.org/cache/epub/2160/pg2160.cover.medium.jpg"
          },
          {
              "id": 1342,
              "title": "Pride and Prejudice",
              "authors": [
                  {
                      "name": "Austen, Jane"
                  }
              ],
              "summaries": [
                  "\"Pride and Prejudice\" by Jane Austen is a classic novel written in the early 19th century. The story delves into themes of love, social class, and individual agency, largely revolving around the life of Elizabeth Bennet, one of five sisters from a modest but genteel family navigating the complex social landscape of Regency England.  The opening of the novel introduces the seemingly universal truth that a single man of wealth is a target for matchmaking mothers in the neighborhood. Mrs. Bennet is eager to marry off her daughters and is excited to hear about the arrival of Mr. Bingley, a wealthy young man who has taken up residence at Netherfield Park. Mr. Bennet's teasing yet indifferent nature contrasts sharply with Mrs. Bennet's anxious and businesslike demeanor as she plans to visit Mr. Bingley to create an opportunity for her daughters. Their witty exchanges set the tone for the story's exploration of family dynamics and social expectations, while also hinting at deeper character developments and the challenges Elizabeth will face regarding love and prejudice in her interactions with Mr. Darcy and the Bingley family. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 39782,
              "cover": "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg"
          },
          {
              "id": 6593,
              "title": "History of Tom Jones, a Foundling",
              "authors": [
                  {
                      "name": "Fielding, Henry"
                  }
              ],
              "summaries": [
                  "\"The History of Tom Jones, A Foundling\" by Henry Fielding is a novel written in the early 18th century. The narrative revolves around the life of Tom Jones, a foundling raised by the benevolent Squire Allworthy, exploring themes of morality, love, and social class. The story is rich in characters and details, illustrating the intricacies of human nature and society’s response to vice and virtue.  At the start of the novel, Fielding introduces Squire Allworthy as a compassionate and virtuous landowner who returns home from London to discover an infant boy, Tom, wrapped in linens in his bed. This event sets the stage for Tom's upbringing, as Allworthy decides to raise him as his own, despite the stigma attached to his illegitimate birth. The narrative also includes a humorous and philosophical commentary on human nature, inviting the reader to reflect on the follies and virtues of society through the interactions of characters like Allworthy, his sister Bridget, and the housekeeper Deborah. As Allworthy navigates the challenges of incorporating Tom into his life, the novel presents an exploration of how society views morality, innocence, and the social implications of being a \"bastard\" in a judgmental world. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 39695,
              "cover": "https://www.gutenberg.org/cache/epub/6593/pg6593.cover.medium.jpg"
          },
          {
              "id": 4085,
              "title": "The Adventures of Roderick Random",
              "authors": [
                  {
                      "name": "Smollett, T. (Tobias)"
                  }
              ],
              "summaries": [
                  "\"The Adventures of Roderick Random\" by Tobias Smollett is a novel written in the early 18th century. The book follows the life and misadventures of Roderick Random, an orphan navigating a world rife with challenges, cruelty, and injustice. As he grows from a neglected child into a young man, Roderick's journey is marked by both comedic elements and social satire.  At the start of the novel, Roderick Random recounts his difficult birth into a life of hardship, beginning with the aversion of his wealthy grandfather to his parents' union. The narrative unfolds through a vivid portrayal of Roderick's childhood, where he faces animosity from his relatives and mistreatment at school. Despite his hardships, Roderick displays resilience and cunning, emboldened by friendships with fellow outcasts. He breaks free from his grim circumstances upon moving to a new setting, where an encounter with his uncle leads him to a supportive environment, setting the stage for his future adventures. Throughout this opening, readers are introduced to a world filled with humor, familial conflict, and early struggles as Roderick seeks a better existence amid adversity. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 39623,
              "cover": "https://www.gutenberg.org/cache/epub/4085/pg4085.cover.medium.jpg"
          },
          {
              "id": 1259,
              "title": "Twenty years after",
              "authors": [
                  {
                      "name": "Dumas, Alexandre"
                  },
                  {
                      "name": "Maquet, Auguste"
                  }
              ],
              "summaries": [
                  "\"Twenty Years After\" by Alexandre Dumas and Auguste Maquet is a historical novel written in the mid-19th century. It serves as the sequel to \"The Three Musketeers\" and continues the adventurous saga of D'Artagnan and his friends—Athos, Porthos, and Aramis. This installment delves into their lives twenty years after the original tale, exploring themes of friendship, loyalty, and political intrigue against the backdrop of a tumultuous France.  At the start of \"Twenty Years After,\" the reader is introduced to the political discontent in France following the death of Cardinal Richelieu. Cardinal Mazarin, his successor, finds himself in troubling times marked by public outrage against the government. The opening scene is set in the Palais Royal where Mazarin contemplates his precarious position amidst rising unrest. We witness D’Artagnan, now older but no less courageous, as he prepares to navigate this new political landscape. The narrative unveils immediate tensions as D’Artagnan is called to assist Mazarin, and we see hints of past friendships and alliances which will come into play as tensions rise. This opening part lays the groundwork for an epic blend of action, political maneuvering, and the enduring camaraderie of the central characters. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 39015,
              "cover": "https://www.gutenberg.org/cache/epub/1259/pg1259.cover.medium.jpg"
          },
          {
              "id": 5197,
              "title": "My Life — Volume 1",
              "authors": [
                  {
                      "name": "Wagner, Richard"
                  }
              ],
              "summaries": [
                  "\"My Life — Volume 1\" by Richard Wagner is an autobiographical work written in the mid-19th century. This volume details the early years and formative experiences of the famed composer, from his childhood in Leipzig to his early professional endeavors around 1842. The book reflects on Wagner's family background, his introduction to music, and the influences that shaped his artistic journey.  The opening of this autobiographical account begins with Wagner’s birth and the immediate aftermath of his father's death, which left his family in difficult circumstances. He describes his stepfather's pivotal role in his upbringing and education, as well as the vibrant cultural environment he was immersed in, including his early encounters with the theatre and music. Throughout the narrative, Wagner recounts his childhood memories, the struggles with education, and the blossoming of his musical talent, which ultimately sets the stage for his future career as a composer. The reader is drawn into the emotions and aspirations of a young artist at the brink of discovering his calling, with significant events, relationships, and sentiments foreshadowing the remarkable life he would lead. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 38994,
              "cover": "https://www.gutenberg.org/cache/epub/5197/pg5197.cover.medium.jpg"
          },
          {
              "id": 174,
              "title": "The Picture of Dorian Gray",
              "authors": [
                  {
                      "name": "Wilde, Oscar"
                  }
              ],
              "summaries": [
                  "\"The Picture of Dorian Gray\" by Oscar Wilde is a novel written during the late 19th century. The story explores themes of art, beauty, and morality, centering on the life of a young man named Dorian Gray, who becomes entranced by his own beauty and the hedonistic philosophies of Lord Henry Wotton. As Dorian gains fame and pleasure through his youthful looks, he grapples with the implications of vanity and the cost of immortality.  At the start of the novel, we are introduced to Lord Henry Wotton and the artist Basil Hallward, who has painted a stunning portrait of Dorian Gray. Basil is deeply enamored with Dorian's beauty and harbors a secret affection for him. The opening chapters establish the dynamic between Lord Henry's cynical worldview and Basil's idealism, culminating in Dorian's arrival in the studio. Dorian's first encounter with Lord Henry sparks a transformative moment; as they converse, Dorian is exposed to Henry’s hedonistic philosophies, which shape his perception of beauty and life. The chapter sets a tone that hints at the foreboding price Dorian may pay for his fascination with youth and aesthetic pleasure. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 31151,
              "cover": "https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg"
          },
          {
              "id": 64317,
              "title": "The Great Gatsby",
              "authors": [
                  {
                      "name": "Fitzgerald, F. Scott (Francis Scott)"
                  }
              ],
              "summaries": [
                  "\"The Great Gatsby\" by F. Scott Fitzgerald is a novel written in the early 20th century. The story is mainly narrated by Nick Carraway, who reflects on the life of his enigmatic neighbor, Jay Gatsby, and the extravagant world of wealth and excess he inhabits. The novel explores themes of the American Dream, love, and social class.  At the start of the novel, Nick Carraway reflects on advice from his father about withholding judgment of others, which sets the stage for the unfolding narrative. We learn about Nick's background, his move to West Egg, and his connection to wealthy acquaintances like Tom and Daisy Buchanan. Nick's first glimpse of Gatsby is during a moment of solitude when he sees Gatsby reaching out toward a distant green light, symbolizing his unattainable dreams. This opening portion lays the groundwork for the intricate relationships and social dynamics in the world of 1920s America, hinting at the luxurious yet hollow lives that many characters lead. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 31021,
              "cover": "https://www.gutenberg.org/cache/epub/64317/pg64317.cover.medium.jpg"
          },
          {
              "id": 25344,
              "title": "The Scarlet Letter",
              "authors": [
                  {
                      "name": "Hawthorne, Nathaniel"
                  }
              ],
              "summaries": [
                  "\"The Scarlet Letter\" by Nathaniel Hawthorne is a classic novel written in the mid-19th century. The book delves into themes of sin, guilt, and redemption, primarily exploring the life of Hester Prynne, a woman shunned by her Puritan community after bearing an illegitimate child. Through her experiences and struggles, the narrative examines the societal and personal ramifications of moral transgressions.  At the start of the novel, the author introduces the setting, a dilapidated jail in colonial Boston, where a crowd has gathered to witness the punishment of Hester Prynne. The scene conveys a deep sense of Puritanical severity, showing the townspeople's intense scrutiny over Hester, who stands accused of adultery. Hawthorne sets a somber tone as he describes the prison and its surroundings, including a wild rosebush that offers a stark contrast to the grimness of the prison, symbolizing hope and compassion amidst human frailty. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 27064,
              "cover": "https://www.gutenberg.org/cache/epub/25344/pg25344.cover.medium.jpg"
          },
          {
              "id": 43,
              "title": "The Strange Case of Dr. Jekyll and Mr. Hyde",
              "authors": [
                  {
                      "name": "Stevenson, Robert Louis"
                  }
              ],
              "summaries": [
                  "\"The Strange Case of Dr. Jekyll and Mr. Hyde\" by Robert Louis Stevenson is a novella written during the late 19th century that delves into the duality of human nature and the struggle between good and evil. The narrative follows Mr. Utterson, a lawyer, as he investigates the mysterious relationship between his friend, Dr. Jekyll, and the sinister Mr. Hyde, uncovering dark secrets that test the boundaries of morality.  At the start of the novella, we meet Mr. Utterson and his distant cousin, Mr. Enfield, who discuss a strange door that Enfield associates with a disturbing story about Hyde trampling a young girl and displaying an unsettling demeanor. Utterson becomes increasingly intrigued by Hyde, especially when he discovers that Hyde stands to inherit Jekyll's wealth upon the doctor's disappearance. The text evokes a sense of foreboding as Utterson grapples with his concerns for Jekyll's welfare while unraveling the enigma surrounding Hyde, whose appearance elicits an inexplicable sense of dread. As the tale unfolds, it sets the stage for a profound exploration of identity, shame, and the darker aspects of human behavior. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 26020,
              "cover": "https://www.gutenberg.org/cache/epub/43/pg43.cover.medium.jpg"
          },
          {
              "id": 2554,
              "title": "Crime and Punishment",
              "authors": [
                  {
                      "name": "Dostoyevsky, Fyodor"
                  }
              ],
              "summaries": [
                  "\"Crime and Punishment\" by Fyodor Dostoyevsky is a novel written in the mid-19th century. The story delves into the psychological turmoil of its main character, Rodion Raskolnikov, a former student living in extreme poverty in St. Petersburg, as he grapples with morality, guilt, and the nature of crime. Raskolnikov's internal struggles and rationalizations set the stage for a broader exploration of existential questions and the consequences of one's choices.  At the start of the novel, readers are introduced to Raskolnikov, who, on a sweltering July evening, leaves his cramped garret, fueled by a mix of fear and dread. He is acutely aware of his troubled finances, particularly his debts to his landlady, which cultivate a sense of isolation and despair. As he wanders through the city's pungent streets, he reflects on his own cowardice and impotence while contemplating a deeply disturbing act he is contemplating. The opening scene captures Raskolnikov's increasingly fraught mental state, portraying him as both an intellectual and a tormented soul. Eventually, he visits an old pawnbroker, Alyona Ivanovna, where an unsettling encounter begins to unfold, hinting at the drastic actions he is considering. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 25785,
              "cover": "https://www.gutenberg.org/cache/epub/2554/pg2554.cover.medium.jpg"
          },
          {
              "id": 98,
              "title": "A Tale of Two Cities",
              "authors": [
                  {
                      "name": "Dickens, Charles"
                  }
              ],
              "summaries": [
                  "\"A Tale of Two Cities\" by Charles Dickens is a historical novel written in the mid-19th century. Set against the backdrop of the French Revolution, the story opens with an exploration of the social and political turmoil of the time, introducing key themes such as resurrection, sacrifice, and the dichotomy between oppression and liberty. The narrative begins with the character Mr. Jarvis Lorry's journey, who is on a mission to retrieve Dr. Alexandre Manette, an imprisoned former physician, who has been \"recalled to life\" after years of suffering.  The opening of the novel vividly depicts the contrasting conditions in England and France, emphasizing the hardships faced by common people. A detailed scene unfolds as Mr. Lorry, traveling on a Dover mail coach, encounters a mysterious messenger who brings him a message related to Dr. Manette. As Mr. Lorry arrives in Paris, we sense ominous undertones of the Revolution as Madame Defarge’s wine shop symbolizes the brewing discontent. The narrative hints at the challenges ahead as characters intertwine in a story of personal and political upheaval, setting the stage for the unfolding drama that explores the quest for justice in the face of tyranny. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 25497,
              "cover": "https://www.gutenberg.org/cache/epub/98/pg98.cover.medium.jpg"
          },
          {
              "id": 2542,
              "title": "A Doll's House : a play",
              "authors": [
                  {
                      "name": "Ibsen, Henrik"
                  }
              ],
              "summaries": [
                  "\"A Doll's House\" by Henrik Ibsen is a three-act play written during the late 19th century. The story revolves around Nora Helmer and her seemingly perfect marriage to Torvald Helmer, as well as themes of gender roles, deception, and the struggle for identity within the constraints of societal expectations.  At the start of the play, we meet Nora, who enters her home in high spirits, preparing for Christmas and eagerly discussing her acquisitions with her husband, Torvald. Their playful banter reveals Nora's childlike demeanor and Torvald's patronizing affection for her. As they converse, it becomes evident there are underlying tensions: Nora has kept a significant secret involving a loan she took out to save Torvald's life during an illness. The arrival of Nora's old friend, Mrs. Linde, introduces additional complexity to the narrative. Their conversation hints at Nora’s hidden struggles and foreshadows the impending conflict as Krogstad, who has connections to Nora’s loan, enters the picture, setting the stage for the unfolding drama. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 25061,
              "cover": "https://www.gutenberg.org/cache/epub/2542/pg2542.cover.medium.jpg"
          },
          {
              "id": 345,
              "title": "Dracula",
              "authors": [
                  {
                      "name": "Stoker, Bram"
                  }
              ],
              "summaries": [
                  "\"Dracula\" by Bram Stoker is a Gothic horror novel written in the late 19th century. The story unfolds through a series of letters, journal entries, and newspaper clippings, primarily following the experiences of Jonathan Harker, a young English solicitor. Harker’s journey takes him to Transylvania, where he encounters the enigmatic Count Dracula, setting a thrilling and mysterious tone that delves into themes of fear, seduction, and the supernatural.  The opening of the novel presents Jonathan Harker’s journal entries, marking the beginning of his travels to meet Count Dracula regarding a real estate transaction. Harker describes his train journey through the picturesque landscapes of eastern Europe, highlighting the eerie atmosphere and local superstitions that hint at the challenges he will face. Upon arriving at the Count's castle, Harker senses unease, especially when local villagers express concern and give him protective charms against evil spirits. The tension escalates as Harker meets Dracula, who, while courteous, exhibits strange and unsettling behavior. Kafkaesque and claustrophobic, the initial chapters effectively set the stage for Harker’s realization that he is trapped in Dracula’s world, creating an eerie, suspenseful foundation for the unfolding narrative. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 24173,
              "cover": "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg"
          },
          {
              "id": 76,
              "title": "Adventures of Huckleberry Finn",
              "authors": [
                  {
                      "name": "Twain, Mark"
                  }
              ],
              "summaries": [
                  "\"Adventures of Huckleberry Finn\" by Mark Twain is a novel likely written in the late 19th century. The book explores the adventures of a young boy named Huckleberry Finn as he grapples with themes of freedom, morality, and societal expectations against the backdrop of the pre-Civil War American South. The narrative takes place as Huck escapes his restrictive life and embarks on a journey down the Mississippi River, where he encounters various characters that challenge his understanding of right and wrong.  The opening of the book introduces Huck Finn, the protagonist, reflecting on his life before the events of the story, specifically referencing his previous adventures with Tom Sawyer. Huck describes his uncomfortable life with the Widow Douglas, who is trying to civilize him, and informs the reader about his father's abusive behavior and his desire to escape. The groundwork is laid for his quest for freedom and individuality, as he is soon joined by Jim, a runaway slave, hinting at the deeper moral complexities that will unfold throughout their journey. The tone is light-hearted yet critical, establishing Huck's voice and his perspective on the absurdities of societal norms. (This is an automatically generated summary.)"
              ],
              "languages": [
                  "en"
              ],
              "download_count": 23862,
              "cover": "https://www.gutenberg.org/cache/epub/76/pg76.cover.medium.jpg"
          }
      ]
  });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch books", details: error.message });
    loggerService.error(error);
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "Book ID is required" });
    }

    const book = await booksService.getById(id);

    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    res.send(book);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch book by ID", details: error.message });
    loggerService.error(error);
  }
}

export async function bookTxt(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ error: "Book ID is required" });
    }
    const data = await booksService.bookToTxt(id);
    if (!data) {
      return res.status(404).send({ error: "Book not found" });
    }
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch book by ID", details: error.message });
    loggerService.error(error);
  }
}
