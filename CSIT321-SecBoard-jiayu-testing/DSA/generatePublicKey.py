from Crypto.PublicKey import DSA
from Crypto.Signature import DSS
from Crypto.Hash import SHA256
# Code from https://pycryptodome.readthedocs.io/en/latest/src/public_key/dsa.html #
# Create a new DSA key pair
key = DSA.generate(2048)
f = open("admin1_key_private.pem", "wb")
f.write(key.export_key())
f.close()
f = open("admin1_key_public.pem", "wb")
f.write(key.publickey().export_key())
f.close()


# Sign a message
#message = b"Y"
#hash_obj = SHA256.new(message)
#signer = DSS.new(key, 'fips-186-3')
#signature = signer.sign(hash_obj)

# Load the public key
#f = open("admin1_key_public.pem", "r")
#hash_obj = SHA256.new(message)
#pub_key = DSA.import_key(f.read())
#verifier = DSS.new(pub_key, 'fips-186-3')

# Verify the authenticity of the message
#try:
#    verifier.verify(hash_obj, signature)
#    print("The message is authentic.")
#except ValueError:
#    print("The message is not authentic.")
