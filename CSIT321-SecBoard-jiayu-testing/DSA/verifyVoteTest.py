from Crypto.PublicKey import DSA
from Crypto.Signature import DSS
from Crypto.Hash import SHA256
# Code from https://pycryptodome.readthedocs.io/en/latest/src/public_key/dsa.html #

# Load the signed vote
f = open("signedVote", "rb")
signature = f.read()
f.close()
print(type(signature))

# Load the message
f = open("signedVoteMessage", "r")
message = f.read().encode('ascii')
f.close()

# Load the public key
f = open("admin1_key_public.pem", "r")
hash_obj = SHA256.new(message)
pub_key = DSA.import_key(f.read())
verifier = DSS.new(pub_key, 'fips-186-3')

# Verify the authenticity of the message
try:
    verifier.verify(hash_obj, signature)
    print("The message is authentic.")
except ValueError:
    print("The message is not authentic.")
