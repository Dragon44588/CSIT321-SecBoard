from Crypto.PublicKey import DSA
from Crypto.Signature import DSS
from Crypto.Hash import SHA256
# Code from https://pycryptodome.readthedocs.io/en/latest/src/public_key/dsa.html #

def signMessage(messageToSign):
    message = messageToSign
    hash_obj = SHA256.new(message)
    # load private key for signing
    f = open("admin1_key_private.pem", "rb")
    key = DSA.import_key(f.read())
    f.close()
    signer = DSS.new(key, 'fips-186-3')
    signature = signer.sign(hash_obj)
    f = open("signedVote", "wb")
    f.write(signature)
    f.close()

    f = open("signedVoteMessage", "w")
    f.write(message.decode('ascii'))
    f.close()
    
    
# Sign a message
message = b"Y"
signMessage(message)
print("Message signed successfully.")


