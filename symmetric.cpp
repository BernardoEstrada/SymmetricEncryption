//cpp boilerplate
#include <iostream>
#include <fstream>

using std::cout;
using std::endl;
using std::string;
using std::hash;
using std::strlen;
using std::ofstream;
using std::ifstream;
hash<string> hasher;

void encrypt(string &message, string &key)
{
  int i;
  char orValue;
  size_t len = message.length();
  size_t keylen = key.length();
  for (i = 0; i < len; i++) {
    message[i] = (message[i] + key[i % keylen]) % sizeof;
    unsigned char aux = (message[i] & 240) >> 4;
    unsigned char aux2 = (message[i] & 15) << 4;
    message[i] = aux | aux2;
    orValue = rand();
    message[i] = message[i] ^ orValue;
    message[i] = message[i] ^ key[i % keylen];
  }
}

void decrypt(string &message, string &key)
{
  int i;
  char orValue;
  size_t len = message.length();
  size_t keylen = key.length();
  for (i = 0; i < len; i++)
  {
    orValue = rand();
    message[i] = message[i] ^ orValue;
    message[i] = message[i] ^ key[i % keylen];
    unsigned char aux = (message[i] & 240) >> 4;
    unsigned char aux2 = (message[i] & 15) << 4;
    message[i] = aux | aux2;
  }
}

int main(int argc, char *argv[]){
  ofstream out;
  ifstream inp;

  string inFile = argv[2];
  string outFile = argv[3];
  string key = argv[4];

  string text;
  size_t keyHash = hasher(key);

  srand(keyHash);

  inp.open(inFile);
  getline(inp, text);
  inp.close();

  unsigned char choice = argv[1][0];
  if(choice == 'e'){
    encrypt(text, key);
  } else if(choice == 'd'){
    decrypt(text, key);
  } else {
    cout << "Invalid option: " << choice << endl;
    return -1;
  }

  out.open(outFile);
  out << text << endl;
  out.close();
  
  return 0;
}
