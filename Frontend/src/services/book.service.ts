import { Book } from "../assets/models/favoriteBooks.models";
import { httpService } from "./http.service";

export const bookService = {
  getBookTxt,
  getBookById,
};

async function getBookTxt(id: string) {
  try {
    const response = await fetch(`http://127.0.0.1:2027/api/books/${id}/txt`);
    if (response.ok) {
      const textData = await response.text();
      const processedTxt = processHtml(textData);
      return processedTxt;
    } else {
      console.error("Failed to fetch text:", response.statusText);
      return response.statusText;
    }
  } catch (error) {
    console.error("Error fetching text:", error);
    throw error;
  }

  function processHtml(html: string): string {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string into a document
    const doc = parser.parseFromString(html, "text/html");

    // Select all img elements and update their src attributes
    const images = doc.querySelectorAll("img");
    if (images) {
      images.forEach((img) => {
        const src = img.getAttribute("src");
        // Check if the src is a relative URL
        if (src && !src.startsWith("http")) {
          // Modify the src to include the full URL
          img.setAttribute(
            "src",
            `https://www.gutenberg.org/cache/epub/${id}/${src}`
          );
        }
      });
    }

    // Return the modified HTML as a string
    return doc.body.innerHTML;
  }
}

async function getBookById(id: string) {
  try {
    return await httpService.get<Book>(`books/${id}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
