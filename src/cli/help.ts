export const help = (): void => {
  console.log("Biblia RÚF — Hungarian Reformed Bible\n");
  console.log("Usage:");
  console.log('  biblia --p="<passage>"       Get a Bible passage');
  console.log('  biblia --passage="<passage>" Get a Bible passage');
  console.log("  biblia --showBooks           Show all Bible books");
  console.log("  biblia --showBooks --old     Show Old Testament books");
  console.log("  biblia --showBooks --new     Show New Testament books");
  console.log("  biblia --bookDetails <book>  Get book details");
  console.log('  biblia --search="<query>"    Search the Bible');
  console.log("  biblia --today               Get today's verse");
  console.log("  biblia -i                    Interactive mode");
  console.log("  biblia --help                Show this help\n");
  console.log("Details: https://github.com/kulcsarrudolf/biblia-ruf");
  console.log("Author: Kulcsár Rudolf");
};
